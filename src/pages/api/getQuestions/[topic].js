import questionsModel from '@/models/questions'
import connectDB from '@/middleware/mongodb'

const getQuestions = async function (req, res) {
    try {
        console.log(req)
        let {topic} = req.query
        topic = topic.split("-").join(" ")
        console.log(topic)
        const questions = await questionsModel.find({topic});
        if (!questions.length) {
            return res.status(404).send({
                status: false,
                error: 'No data Found',
            });
        }
        return res
            .status(200)
            .send({ status: true, data: questions });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};


export default connectDB(getQuestions)