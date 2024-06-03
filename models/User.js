const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Added for password hashing

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Adjust minimum password length as needed
  },
  // Add other user fields as needed (e.g., email, firstName, lastName)
});

// Hash password before saving the user (using a pre-save hook)
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) { // Only hash if new or password changed
    const saltRounds = 10; // Adjust salt rounds as needed
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
