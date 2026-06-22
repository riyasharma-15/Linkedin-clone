import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import Connection from "../models/connections.model.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import PDFDocument from 'pdfkit';


export const register = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;
        if (!name || !email || !password || !username)
            return res.status(400).json({ message: "All fields are required" })

        const user = await User.findOne({
            email
        });
        if (user) return res.status(400).json({ message: "User already exists" })

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username
        });
        await newUser.save();

        const profile = new Profile({ userId: newUser._id });
        await profile.save();

        return res.json({ message: "User registered Successfully" })

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if ((!email && !username) || !password) {
            return res.status(400).json({ message: "Email/Username and Password are required" });
        }

        // Find user by email OR username
        const user = await User.findOne({
            $or: [
                { email: email || "" },
                { username: username || "" }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate session token
        const token = crypto.randomBytes(32).toString('hex');

        // Store token in database
        user.token = token;
        await user.save();

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "userId parameter is required" });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find profile (or create one if it doesn't exist yet)
        let profile = await Profile.findOne({ userId });
        if (!profile) {
            profile = new Profile({ userId: user._id });
            await profile.save();
        }

        return res.status(200).json({
            message: "User profile fetched successfully",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                ProfilePicture: user.ProfilePicture,
                fileType: user.fileType
            },
            profile: {
                bio: profile.bio,
                currentPost: profile.currentPost,
                pastWork: profile.pastWork,
                education: profile.education
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { userId, bio, currentPost, pastWork, education } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required in the request body" });
        }

        // Find profile
        let profile = await Profile.findOne({ userId });
        if (!profile) {
            // Check if user exists before creating profile
            const userExists = await User.exists({ _id: userId });
            if (!userExists) {
                return res.status(404).json({ message: "User not found" });
            }
            profile = new Profile({ userId });
        }

        // Update fields if provided
        if (bio !== undefined) profile.bio = bio;
        if (currentPost !== undefined) profile.currentPost = currentPost;
        if (pastWork !== undefined) profile.pastWork = pastWork;
        if (education !== undefined) profile.education = education;

        await profile.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            profile
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateProfilePicture = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required in the request body" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file was uploaded. Please send an image file under the 'profile_pic' key" });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete previous profile picture if it exists and is not the default
        if (user.ProfilePicture && user.ProfilePicture !== 'default.jpg') {
            try {
                const oldPath = path.join('uploads', user.ProfilePicture);
                await fs.unlink(oldPath);
            } catch (unlinkError) {
                console.error("Failed to delete old profile picture:", unlinkError);
                // Continue execution so we don't block uploading the new image
            }
        }

        // Update profile picture properties
        user.ProfilePicture = req.file.filename;
        user.fileType = req.file.mimetype;

        await user.save();

        return res.status(200).json({
            message: "Profile picture updated successfully",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                ProfilePicture: user.ProfilePicture,
                fileType: user.fileType
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Resume handlers
export const uploadResume = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "userId is required in the request body" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "No resume file uploaded. Send a PDF under the 'resume' key" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Delete previous resume if exists
        if (user.resume && user.resume !== '') {
            try {
                const oldPath = path.join('uploads', user.resume);
                await fs.unlink(oldPath);
            } catch (e) {
                console.error('Failed to delete old resume:', e);
            }
        }
        user.resume = req.file.filename;
        await user.save();
        return res.status(200).json({ message: "Resume uploaded successfully", resume: req.file.filename });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const downloadResume = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "userId parameter is required" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.resume) {
            return res.status(404).json({ message: "Resume not found for this user" });
        }
        const filePath = path.resolve('uploads', user.resume);
        return res.download(filePath);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Generate user profile PDF
export const generateUserPdf = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "userId parameter is required" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const profile = await Profile.findOne({ userId });

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="resume_${user.username || userId}.pdf"`);
        doc.pipe(res);

        // Header
        doc.fontSize(22).text(user.name || 'Resume', { align: 'center' });
        doc.moveDown(0.3);
        doc.fontSize(11).fillColor('#555').text(`${user.email}  |  @${user.username}`, { align: 'center' });
        doc.moveDown();
        doc.moveTo(50, doc.y).lineTo(560, doc.y).strokeColor('#ccc').stroke();
        doc.moveDown();

        if (profile) {
            // Bio / Summary
            if (profile.bio) {
                doc.fontSize(14).fillColor('#000').text('Summary');
                doc.moveDown(0.3);
                doc.fontSize(11).fillColor('#333').text(profile.bio);
                doc.moveDown();
            }

            // Current Position
            if (profile.currentPost) {
                doc.fontSize(14).fillColor('#000').text('Current Position');
                doc.moveDown(0.3);
                doc.fontSize(11).fillColor('#333').text(profile.currentPost);
                doc.moveDown();
            }

            // Work Experience
            if (Array.isArray(profile.pastWork) && profile.pastWork.length) {
                doc.fontSize(14).fillColor('#000').text('Work Experience');
                doc.moveDown(0.3);
                profile.pastWork.forEach((w) => {
                    doc.fontSize(11).fillColor('#333').text(
                        `${w.company || 'N/A'}  —  ${w.position || 'N/A'}  (${w.years || 'N/A'})`
                    );
                });
                doc.moveDown();
            }

            // Education
            if (Array.isArray(profile.education) && profile.education.length) {
                doc.fontSize(14).fillColor('#000').text('Education');
                doc.moveDown(0.3);
                profile.education.forEach((e) => {
                    doc.fontSize(11).fillColor('#333').text(
                        `${e.school || 'N/A'}  —  ${e.degree || ''} ${e.fieldOfStudy ? 'in ' + e.fieldOfStudy : ''}`
                    );
                });
                doc.moveDown();
            }
        }

        doc.end();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const sendConnectionRequest = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        if (!senderId || !receiverId) {
            return res.status(400).json({
                message: "Sender and Receiver are required"
            });
        }

        if (senderId === receiverId) {
            return res.status(400).json({
                message: "You cannot connect with yourself"
            });
        }

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const existingRequest = await Connection.findOne({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        });

        if (existingRequest) {
            return res.status(400).json({
                message: "Connection request already exists"
            });
        }

        const connection = new Connection({
            sender: senderId,
            receiver: receiverId,
        });

        await connection.save();

        return res.status(201).json({
            message: "Connection request sent successfully",
            connection,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const acceptConnectionRequest = async (req, res) => {
    try {

        const { requestId } = req.params;

        const request = await Connection.findById(requestId);

        if (!request) {
            return res.status(404).json({
                message: "Connection request not found"
            });
        }

        request.status = "accepted";

        await request.save();

        return res.status(200).json({
            message: "Connection accepted successfully",
            request
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const rejectConnectionRequest = async (req, res) => {
    try {

        const { requestId } = req.params;

        const request = await Connection.findById(requestId);

        if (!request) {
            return res.status(404).json({
                message: "Connection request not found"
            });
        }

        request.status = "rejected";

        await request.save();

        return res.status(200).json({
            message: "Connection rejected",
            request
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
export const getPendingRequests = async (req, res) => {

    try {

        const { userId } = req.params;

        const requests = await Connection.find({
            receiver: userId,
            status: "pending"
        }).populate("sender", "name username email");

        return res.status(200).json({
            requests
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getMyConnections = async (req, res) => {

    try {

        const { userId } = req.params;

        const connections = await Connection.find({
            status: "accepted",
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        })
            .populate("sender", "name username")
            .populate("receiver", "name username");

        return res.status(200).json({
            connections
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};