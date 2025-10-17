import mongoose, { Schema, model, models } from 'mongoose';

export interface IEvent {
  eventId: string;
  category: 'technical' | 'cultural' | 'convenor';
  societyName: string;
  eventName: string;
  regFees: number;
  dateTime: Date;
  location: string;
  briefDescription: string;
  pdfLink: string;
  image: string; // base64url
  mapCoordinates?: {
    latitude: number;
    longitude: number;
  };
  contactInfo: string;
  team: number;
  teamLimit: number;
}

const EventSchema = new Schema<IEvent>(
  {
    eventId: {
      type: String,
      required: [true, 'Event ID is required'],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['technical', 'cultural', 'convenor'],
        message: 'Category must be either technical, cultural, or convenor',
      },
    },
    societyName: {
      type: String,
      required: [true, 'Society name is required'],
      trim: true,
    },
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    regFees: {
      type: Number,
      required: [true, 'Registration fees is required'],
      min: [0, 'Registration fees cannot be negative'],
    },
    dateTime: {
      type: Date,
      required: [true, 'Date and time is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    briefDescription: {
      type: String,
      required: [true, 'Brief description is required'],
      trim: true,
    },
    pdfLink: {
      type: String,
      required: [true, 'PDF link is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      // This will store base64url encoded image
    },
    mapCoordinates: {
      type: {
        latitude: {
          type: Number,
          required: true,
          min: -90,
          max: 90,
        },
        longitude: {
          type: Number,
          required: true,
          min: -180,
          max: 180,
        },
      },
      required: false,
      _id: false, // Prevent mongoose from creating _id for subdocument
    },
    contactInfo: {
      type: String,
      required: [true, 'Contact info is required'],
      trim: true,
    },
    team: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Team count cannot be negative'],
    },
    teamLimit: {
      type: Number,
      required: [true, 'Team limit is required'],
      min: [0, 'Team limit cannot be negative'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Add indexes for better query performance
EventSchema.index({ eventId: 1 });
EventSchema.index({ category: 1 });
EventSchema.index({ dateTime: 1 });

// Prevent model recompilation in development (Next.js hot reload)
const Event = models.Event || model<IEvent>('Event', EventSchema);

export default Event;
