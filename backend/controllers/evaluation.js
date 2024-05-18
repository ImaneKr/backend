const { Evaluation, Kid, Subject } = require('../models/models')

const addKidMarks = async (req, res) => {

    const { kid_id } = req.params;

    try {
        // Check if the kid_id exists in the Kid table
        const kidExists = await Kid.findByPk(kid_id);
        if (!kidExists) {

            return res.status(404).json({ message: 'Kid not found' });
        }
        const existingEvaluations = await Evaluation.findAll({
            where: { kid_id: kid_id }
        });

        // If no evaluations exist, add default marks for all subjects
        if (existingEvaluations.length === 0) {
            await addKidMarks(kid_id);
        }

        return res.status(200).json(kidExists);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


const getAllSubjectMarksForKid = async (req, res) => {
    const { kid_id } = req.params;

    try {
        // Check if the kid_id exists in the Kid table
        const kidExists = await Kid.findByPk(kid_id);
        if (!kidExists) {

            return res.status(404).json({ message: 'Kid not found' });
        }

        // Check if the kid_id has entries in the Evaluation table
        const existingEvaluations = await Evaluation.findAll({
            where: { kid_id }
        });


        return res.status(200).json(existingEvaluations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const editEvaluationMarks = async (req, res) => {
    const { kid_id, evaluations } = req.body;

    try {
        // Check if the kid_id exists in the Kid table
        const kidExists = await Kid.findByPk(kid_id);
        if (!kidExists) {
            return res.status(404).json({ message: 'Kid not found' });
        }

        // Iterate over each evaluation in the array
        for (const eval of evaluations) {
            const { subject_id, mark } = eval;

            // Check if the subject_id exists in the Subject table
            const subjectExists = await Subject.findByPk(subject_id);
            if (!subjectExists) {
                return res.status(404).json({ message: `Subject with id ${subject_id} not found` });
            }

            // Find the evaluation
            let evaluation = await Evaluation.findOne({
                where: {
                    kid_id,
                    subject_id
                }
            });

            if (evaluation) {
                // Update the mark if evaluation exists
                evaluation.mark = mark;
                await evaluation.save();
            } else {
                // Create a new evaluation if it does not exist
                await Evaluation.create({ kid_id, subject_id, mark });
            }
        }

        // Retrieve and return the updated evaluations
        const updatedEvaluations = await Evaluation.findAll({
            where: {
                kid_id
            },
            include: [
                {
                    model: Subject,
                    attributes: ['subject_name']
                }
            ]
        });

        return res.status(200).json(updatedEvaluations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
};
module.exports = {
    getAllSubjectMarksForKid,
    editEvaluationMarks,
    addKidMarks
};
