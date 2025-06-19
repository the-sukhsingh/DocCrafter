import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {  helloWorld, StartProject, GenerateChapters } from "../../../inngest/functions";
import { GenerateContent } from "@/inngest/generate";


export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        helloWorld, // <-- This is where you'll always add all your functions
        StartProject,
        GenerateChapters,
        GenerateContent
    ],
});
