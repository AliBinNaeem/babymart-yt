import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin','deliveryman'], default: 'user' },
    avatar: { type: String, default: "https://previews.123rf.com/images/apoev/apoev2107/apoev210700029/171405822-default-avatar-photo-placeholder-gray-profile-picture-icon-business-man-illustration.jpg" },
    addresses:[
        {
            street: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
            postalCode: { type: String, required: true},
            isDefault: { type: Boolean, default: false }
        }
    ],
    // wishlist
    //cart
    //orders


}, { 
    // createdAt and updatedAt fields
    timestamps: true 
});

// Password Encryption
// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    // bcrypt.compare(enteredPassword, this.password)
    // bcrypt.compare() is used to check if the entered password (in plain text) matches the hashed password stored in the database.
    return await bcrypt.compare(enteredPassword, this.password);
}
    // Encrypt password before saving to database using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Ensure only one default address
userSchema.pre('save', async function (next) {
//     // https://youtu.be/y31BLaEJ4JM?t=3319
    if (this.isModified('addresses')) {
        const defaultAddresses = this.addresses.filter(addr => addr.isDefault);
        if (defaultAddresses.length > 1) {
            defaultAddresses[0].isDefault = false; 
        }

        next();
    }
});

const User = mongoose.model('User', userSchema);
// export default mongoose.model('User', userSchema);      
export default User;
// https://youtu.be/y31BLaEJ4JM?t=2399
// https://youtu.be/y31BLaEJ4JM?t=2563