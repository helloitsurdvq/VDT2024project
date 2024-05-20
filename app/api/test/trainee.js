const chai = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");
const app = require("../index");
const Trainee = require("../models/trainee");
const {
  getAllTrainees,
  getOneTrainee,
  saveTrainee,
  updateTrainee,
  deleteTrainee,
} = require("../controllers/traineeController");
const { expect } = chai;
// npx mocha test/trainee.js
describe("Trainee Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("/GET getAllTrainees", () => {
    it("should return all trainees with a 200 status code", async () => {
      const mockTrainees = [
        {
          _id: "6646593c421113400dc71794",
          name: "test1",
          email: "tes1@gmail.com",
          gender: "Nam",
          school: "Học viện Công Nghệ Bưu Chính Viễn Thông",
        },
        {
          _id: "6646e29d9ab7288d89c15516",
          name: "test2",
          email: "test2@soict.hust.edu.vn",
          gender: "Nam",
          school: "HUST",
        },
      ];

      sinon.stub(Trainee, "find").resolves(mockTrainees);
      await getAllTrainees(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.json.calledWith({
          count: mockTrainees.length,
          data: mockTrainees,
        })
      ).to.be.true;
    });

    it("should handle errors and return a 500 status code", async () => {
      const error = new Error("Something went wrong");
      sinon.stub(Trainee, "find").rejects(error);
      await getAllTrainees(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: error.message })).to.be.true;
    });
  });

  describe("/GET/:id getOneTrainee", () => {
    it("should return a trainee with a 200 status code", async () => {
      const mockTrainee = {
        _id: "6646593c421113400dc71794",
        name: "test1",
        email: "tes1@gmail.com",
        gender: "Nam",
        school: "Học viện Công Nghệ Bưu Chính Viễn Thông",
      };

      req.params = { id: "6646593c421113400dc71794" };

      sinon.stub(Trainee, "findById").resolves(mockTrainee);
      await getOneTrainee(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockTrainee)).to.be.true;
    });

    it("should handle errors and return a 500 status code", async () => {
      const error = new Error("Something went wrong");
      req.params = { id: "66475aae235987af8a8545d4" };

      sinon.stub(Trainee, "findById").rejects(error);
      await getOneTrainee(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: error.message })).to.be.true;
    });

    it("should return a 404 status code if trainee not found", async () => {
      req.params = { id: "nonexistentId" };

      sinon.stub(Trainee, "findById").resolves(null);
      await getOneTrainee(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Trainee not found" })).to.be.true;
    });
  });

  describe("/POST saveTrainee", () => {
    it("should create a trainee and return a 201 status code", async () => {
      const mockTrainee = {
        _id: "664780d9300a9d6a69e1765d",
        name: "cccc",
        email: "ccc@gmail.com",
        gender: "Nữ",
        school: "PTIT",
        createdAt: "2024-05-17T16:07:53.514Z",
        updatedAt: "2024-05-17T16:07:53.514Z",
        __v: 0,
      };

      req.body = {
        name: "cccc",
        email: "ccc@gmail.com",
        gender: "Female",
        school: "PTIT",
      };

      sinon.stub(Trainee, "create").resolves(mockTrainee);
      await saveTrainee(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.send.calledWith(mockTrainee)).to.be.true;
    });

    it("should handle missing fields and return a 400 status code", async () => {
      req.body = {
        email: "aaa@gmail.com",
        gender: "Female",
        school: "HUST",
      };

      await saveTrainee(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(
        res.send.calledWith({
          message: "Send all required fileds",
        })
      ).to.be.true;
    });

    it("should handle errors and return a 500 status code", async () => {
      const error = new Error("Something went wrong");
      req.body = {
        name: "cccc",
        email: "ccc@gmail.com",
        gender: "Female",
        school: "PTIT",
      };

      sinon.stub(Trainee, "create").rejects(error);
      await saveTrainee(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: error.message })).to.be.true;
    });
  });

  describe("/PUT/:id updateTrainee", () => {
    it("should update a trainee and return a 200 status code", async () => {
      const mockUpdatedTrainee = {
        _id: "66475aedf9dc3815c789ce3d",
        name: "lorem ipsum",
        email: "test3@gmail.com",
        gender: "Không rõ",
        school: "UET",
        createdAt: "2024-05-17T13:26:05.700Z",
        updatedAt: "2024-05-17T16:13:52.937Z",
        __v: 0,
      };

      req.params = { id: "66475aedf9dc3815c789ce3d" };
      req.body = { name: "lorem ipsum" };

      sinon.stub(Trainee, "findByIdAndUpdate").resolves(mockUpdatedTrainee);
      await updateTrainee(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.send.calledWith({
          message: "Trainee updated successfully",
          data: mockUpdatedTrainee,
        })
      ).to.be.true;
    });

    it("should return a 400 status code if no update data is provided", async () => {
      req.params = { id: "66475aedf9dc3815c789ce3d" };
      req.body = {};

      await updateTrainee(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(
        res.send.calledWith({
          message: "No update data provided",
        })
      ).to.be.true;
    });

    it("should return a 404 status code if trainee not found", async () => {
      req.params = { id: "nonexistentId" };
      req.body = { name: "lorem ipsum" };

      sinon.stub(Trainee, "findByIdAndUpdate").resolves(null);
      await updateTrainee(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Trainee not found" })).to.be.true;
    });

    it("should handle errors and return a 500 status code", async () => {
      const error = new Error("Something went wrong");
      req.params = { id: "66475aedf9dc3815c789ce3d" };
      req.body = { name: "lorem ipsum" };

      sinon.stub(Trainee, "findByIdAndUpdate").rejects(error);
      await updateTrainee(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: error.message })).to.be.true;
    });
  });

  describe("/DELETE/:id deleteTrainee", () => {
    it("should delete a trainee and return a 200 status code", async () => {
      req.params = { id: "66475aedf9dc3815c789ce3d" };

      sinon.stub(Trainee, "findByIdAndDelete").resolves(true);
      await deleteTrainee(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith({ message: "Trainee deleted successfully" }))
        .to.be.true;
    });

    it("should return a 404 status code if trainee not found", async () => {
      req.params = { id: "nonexistentId" };

      sinon.stub(Trainee, "findByIdAndDelete").resolves(null);
      await deleteTrainee(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Trainee not found" })).to.be.true;
    });

    it("should handle errors and return a 500 status code", async () => {
      const error = new Error("Something went wrong");
      req.params = { id: "66475aedf9dc3815c789ce3d" };

      sinon.stub(Trainee, "findByIdAndDelete").rejects(error);
      await deleteTrainee(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: error.message })).to.be.true;
    });
  });
});