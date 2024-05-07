// Файл: api/updateCandidate/[id]/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from '@/app/lib/utils';
import { Candidate } from "@/app/lib/models";



export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const candidateId = req.query.id;  // Получение ID кандидата из URL

        if (!candidateId || typeof candidateId !== 'string') {
            return res.status(400).json({ message: "Invalid or missing candidate ID" });
        }

        await connectToDB();

        // Извлечение данных кандидата из тела запроса
        const updateData = req.body;

        // Обновление данных кандидата
        const updatedCandidate = await Candidate.findByIdAndUpdate(candidateId, updateData, { new: true });
        if (!updatedCandidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // Успешный ответ с обновленными данными
        return res.status(200).json({
            message: "Candidate updated successfully",
            candidate: updatedCandidate
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating candidate",
            error: error.toString()
        });
    }
};
