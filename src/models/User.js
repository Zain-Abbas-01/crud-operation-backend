import mongoose from 'mongoose'

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
})

const Counter =
  mongoose.models.Counter || mongoose.model('Counter', counterSchema)

export async function getNextUserId() {
  const counter = await Counter.findByIdAndUpdate(
    'userId',
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  )
  return counter.seq
}

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
)

userSchema.set('toJSON', {
  transform(_doc, ret) {
    ret.createdAt = ret.createdAt?.toISOString()
    delete ret._id
    return ret
  },
})

export const User =
  mongoose.models.User || mongoose.model('User', userSchema)
