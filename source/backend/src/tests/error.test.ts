import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from 'supertest';
import UserModel from "../models/user-model";
import { TaskModel } from "../models/task-model";
import { app } from "../index";
import mongoose from "mongoose";
import "dotenv/config";
import { HTTPSTATUS } from "../config/http-config";

describe("Task API - Sad Path & Security Tests", () => {
  let authCookie: string[];

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI!);
    }

    await UserModel.deleteMany({});
    await TaskModel.deleteMany({});

    const strangerId = new mongoose.Types.ObjectId();
    await TaskModel.create({
      _id: new mongoose.Types.ObjectId(),
      title: "User B's Private Task",
      description: "Should not be visible to User A",
      userId: strangerId,
      status: "to-do",
      priority: "high"
    });

    await request(app).post("/api/auth/register").send({
      name: "User A",
      email: "usera@test.com",
      password: "Password123!",
      confirmPassword: "Password123!"
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "usera@test.com",
      password: "Password123!",
    });

    authCookie = loginRes.get("Set-Cookie") as string[];
  }, 20000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("REJECT - should fail when sending invalid task data", async () => {
    const res = await request(app)
      .post("/api/task/create-task")
      .set("Cookie", authCookie)
      .send({
        title: "", 
        status: "not-a-real-status", 
        priority: "super-priority"
      });

    expect(res.status).toBe(HTTPSTATUS.BAD_REQUEST);
    expect(res.body.message.toLowerCase()).toContain("validation");
  });

  it("REJECT - should fail to create a task if user is NOT logged in", async () => {
    const res = await request(app)
      .post("/api/task/create-task")
      .send({
        title: "I am a ghost",
        status: "to-do",
        priority: "low"
      });

    expect(res.status).toBe(HTTPSTATUS.UNAUTHORIZED);
  });
  it("REJECT - User A should NOT be able to view User B's task", async () => {
    const strangerTask = await TaskModel.findOne({ title: "User B's Private Task" });

    const res = await request(app)
      .get(`/api/task/get-task/${strangerTask?._id}`)
      .set("Cookie", authCookie);

    expect([403, 404]).toContain(res.status);
    
    if (res.body.task) {
        expect(res.body.task.title).not.toBe("User B's Private Task");
    }
  });
});