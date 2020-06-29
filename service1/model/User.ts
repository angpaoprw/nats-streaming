import mongoose from 'mongoose'

interface UserAttrs {
    email: string
    password: string
}

interface UserDoc extends mongoose.Document {
    email: string
    password: string
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

UserSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('users', UserSchema);

export { User }
