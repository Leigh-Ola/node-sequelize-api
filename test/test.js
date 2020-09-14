const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();
const { Comment } = require("../models");

chai.use(chaiHttp);

describe("MAX.NG API", function() {
  //Before each test we empty the database
  beforeEach(function(done) {
    Comment.destroy({
      where: {},
      truncate: true
    });
    done();
  });
  describe("/POST/:id Comment", function() {
    it("Post a new comment", function(done) {
      const comment = {
        comment: "Jack Ma Chen Wei Biography"
      };
      chai
        .request(app)
        .post("/comment/1")
        .send(comment)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
      chai
        .request(app)
        .get("/comments/1")
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
      chai
        .request(app)
        .get("/comments")
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
      chai
        .request(app)
        .get("/movies")
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
      chai
        .request(app)
        .get("/characters")
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
