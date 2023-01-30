name: {
                type: String,
                required: true
            },

const kittySchema = new mongoose.Schema({
  name: String
});
const Student = mongoose.model('Student', kittySchema);
const fluffy = new Student({ name: 'fluffy' });
await fluffy.save();

await Student.find({ name: /^fluff/ });