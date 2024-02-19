import OpenAI from "openai";

async function sleep(fn, ms = 12000, ...args) {
  await new Promise(resolve => setTimeout(resolve, ms));;
  return fn(...args);
}

export default class OpenAiApi {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.chatMessages = [];
    this.assistant = null;
    this.thread = null;
    this.createAssistant();
    this.run = null;
  }

  async createAssistant() {

    const description = `Classify email and retrieve data`;
    const instructions = `Identify emails that are job application. Then classify provided emails as "Applied", "Rejected" or "Not an application" and extract the job title, company and location from the email. Return it as a json object.`;

    const getAssisant = await this.openai.beta.assistants.list();
    if (getAssisant.data.length === 0) {
      this.assistant = await this.openai.beta.assistants.create({
        name: "classify_application_email",
        description: description,
        instructions: instructions,
        // capabilities: capabilities,
        model: "gpt-3.5-turbo",
        // model="gpt-4-turbo-preview"
      });
    } else {
      this.assistant = getAssisant.data.find(x => (x.description === description) && (x.instructions === instructions));
    }
    
    this.thread = await this.openai.beta.threads.create();
  }

  async getGptResponse() {
    const getRunStatus = this.openai.beta.threads.runs.retrieve(
      thread_id=this.thread.id,
      run_id=this.run.id
    )

    if (getRunStatus.status !== "completed") {
      await sleep(this.getGptResponse)
    }

    this.chatMessages = await this.openai.beta.threads.messages.list(
      thread_id=thread.id
    )
  }

  async emailClassifierAssistant(content) {

    await this.openai.beta.threads.messages.create(this.thread.id, {role: "user", content: content});

    this.run = await this.openai.beta.threads.runs.create(this.thread.id, {
      assistant_id: this.assistant.id,
    });
    const responses = await this.openai.beta.threads.runs.retrieve(this.thread.id, this.run.id);
    const messages = await this.openai.beta.threads.messages.list(this.thread.id);

    if (this.run.status !== "completed") {
      await sleep(this.getGptResponse)
    }

    return this.chatMessages;
  }

  async jobApplicationClassification(message) {
    const formatQuestion = `Is this a job application email? ${message}`;
    const chatResponse = await this.createChatCompletion(formatQuestion);
    this.chatMessages.push(chatResponse.message);
    if (
      chatResponse.role === "assistant" &&
      chatResponse.content.includes("Yes")
    ) {
      const followUpQuestion = `Has the candidate been rejected?`;
      const chatResponse = await this.createChatCompletion(followUpQuestion);
      if (
        chatResponse.role === "assistant" &&
        chatResponse.content.includes("Yes")
      ) {
        return {
          text: "rejected",
          value: 2,
        };
      }
      this.chatMessages.push(chatResponse.message);
      return "applied";
    }

    return null;
  }

  async extractInformation(message) {
    const formatQuestion = `Extract the job title, company and location from the email ${message}`;
    const chatResponse = await this.createChatCompletion(formatQuestion);
    return chatResponse.message.content;
  }
}
