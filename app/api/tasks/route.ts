// /api/updateCandidate.js

import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";
import { Candidate, Partner } from "@/app/lib/models";
export default async function handler(req, res) {
  const { candidateId, partnerId, comment } = req.body;

  await connectToDB();

  try {
    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const partner = await Partner.findById(partnerId);

    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    const taskText = `Кандидат (${candidate.name}) отправлен на собеседование к (${partner.companyName}) комментарий: ${comment}`;

    candidate.tasks.push({ text: taskText });
    await candidate.save();

    res.status(200).json({ message: 'Task added to candidate' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
