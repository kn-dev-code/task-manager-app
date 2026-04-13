import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from 'supertest';
import UserModel from "../models/user-model";
import { TaskModel } from "../models/task-model";
import { app } from "../index";
import mongoose from "mongoose";
import "dotenv/config"; 
import { HTTPSTATUS } from "../config/http-config";

describe("Task CRUD Integration Tests", () => {
  let authCookie: string[];

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI!);
    }

    await UserModel.deleteMany({});
    await TaskModel.deleteMany({});

    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testemail@gmail.com",
      password: "test2233434",
      confirmPassword: "test2233434"
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "testemail@gmail.com",
      password: "test2233434",
    });

    authCookie = loginRes.get("Set-Cookie") as string[];
    
    if (!authCookie) {
      throw new Error("Failed to capture auth cookie. Check your Login logic.");
    }
  }, 20000); 
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("POST /api/task/create-task - should create a task", async () => {
    const taskRes = await request(app)
      .post("/api/task/create-task")
      .set("Cookie", authCookie) 
      .send({
        title: "Fix the UI",
        description: "Testing cookies", 
        status: "in-progress",
        priority: "medium",
        tags: ["important", "not-important", "blah-blah-blah"],
      });

    expect(taskRes.status).toBe(HTTPSTATUS.CREATED)
    expect(taskRes.body.task.title).toBe("Fix the UI");
  });
});