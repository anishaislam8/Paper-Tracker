import { Schema, model, models } from 'mongoose';

const PaperSchema = new Schema({
    title:{
        type: String,
        required: [true, "Title is required!"],
    },
    authors:{
        type: String,
        required: [true, "Authors is required!"],
    },
    publicationYear:{
        type: Number,
        required: [true, "Publication year is required!"],
    },
    publicationVenue:{
        type: String,
        required: [true, "Publication venue is required!"],
    },
    paperSummary:{
        type: String
    },
    paperAbstract:{
        type: String
    },
    paperKeywords:{
        type: String,
        required: [true, "Paper keywords is required!"],
    },
    citation:{
        type: String,
    },
    paperUrl:{
        type: String,
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

const Paper = models.Paper || model('Paper', PaperSchema);
export default Paper;