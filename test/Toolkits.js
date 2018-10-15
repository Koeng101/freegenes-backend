//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const shortid = require('shortid');
const VirtualPart = require('../models/Toolkit');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Toolkit', () => {

  beforeEach((done) => {
    VirtualPart.remove({}, (err) => { 
      done();           
    });        
  });

  describe('/GET /toolkits', () => {
    it('it should GET all the toolkits', (done) => {
      chai.request(server)
        .get('/toolkits')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.message.should.be.a('string');
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST /toolkits/new', () => {
// uuid
    it('it should not POST a toolkit without uuid field', (done) => {
      let toolkit = {
        author: "foo",
        name: "baz",
        description: "bar baz quay",
        authorAffiliation : "fooford",
        authorEmail : "foo@bar.baz",
        authorName : "foo baz",
        authorOrcid : "http://orcid/foo",
        tags: ['foo', 'bar', 'baz'],
        datName: "fooDat",
        datHash: "fooHash",
        revision: 0,
        revisionNotes: "revisionNotes",
        toolkit: "toolkit",
      };
      chai.request(server)
        .post('/toolkits/new')
        .send(toolkit)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have.property('errors');
          res.body.error.errors.should.have.property('uuid');
          res.body.error.errors.uuid.should.have.property('kind').eql('required');
          done();
        });

    });

// author
    it('it should not POST a toolkit without author field', (done) => {
      let toolkit = {
        name: "baz",
        description: "bar baz quay",
        authorAffiliation : "fooford",
        authorEmail : "foo@bar.baz",
        authorName : "foo baz",
        authorOrcid : "http://orcid/foo",
        targetOrganism : "foOrganism",
        sourceOrganism : "barganism",
        toolkitType : "baz",
        sequence : "fooooooooo",
        tags: ['foo', 'bar', 'baz'],
        datName: "fooDat",
        datHash: "fooHash",
	uuid: "uuid",
	revision: 0,
	revisionNotes: "revisionNotes",
	toolkit: "toolkit",
      };
      chai.request(server)
        .post('/toolkits/new')
        .send(toolkit)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have.property('errors');
          res.body.error.errors.should.have.property('author');
          res.body.error.errors.author.should.have.property('kind').eql('required');
          done();
        });

    });
// name
    it('it should not POST a toolkit without name field', (done) => {
      let toolkit = {
        author: "foo",
        description: "bar baz quay",
        authorAffiliation : "fooford",
        authorEmail : "foo@bar.baz",
        authorName : "foo baz",
        authorOrcid : "http://orcid/foo",
        tags: ['foo', 'bar', 'baz'],
        datName: "fooDat",
        datHash: "fooHash",
	uuid: "uuid",
        revision: 0,
        revisionNotes: "revisionNotes",
        toolkit: "toolkit",


      };
      chai.request(server)
        .post('/toolkits/new')
        .send(toolkit)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have.property('errors');
          res.body.error.errors.should.have.property('name');
          res.body.error.errors.name.should.have.property('kind').eql('required');
          done();
        });
    });
// authorEmail
    it('it should not POST a toolkit without author email field', (done) => {
      let toolkit = {
	name: "baz",
        author: "foo",
        description: "bar baz quay",
        authorAffiliation : "fooford",
        authorName : "foo baz",
        authorOrcid : "http://orcid/foo",
        tags: ['foo', 'bar', 'baz'],
        datName: "fooDat",
        datHash: "fooHash",
	uuid: "uuid",
        revision: 0,
        revisionNotes: "revisionNotes",
        toolkit: "toolkit",


      };
      chai.request(server)
        .post('/toolkits/new')
        .send(toolkit)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have.property('errors');
          res.body.error.errors.should.have.property('authorEmail');
          res.body.error.errors.authorEmail.should.have.property('kind').eql('required');
          done();
        });
// authorName
    });
    it('it should not POST a toolkit without author name field', (done) => {
      let toolkit = {
	name: "baz",
        author: "foo",
        description: "bar baz quay",
        authorAffiliation : "fooford",
        authorEmail : "foo@bar.baz",
        authorOrcid : "http://orcid/foo",
        tags: ['foo', 'bar', 'baz'],
        datName: "fooDat",
        datHash: "fooHash",
	uuid: "uuid",
        revision: 0,
        revisionNotes: "revisionNotes",
        toolkit: "toolkit",


      };
      chai.request(server)
        .post('/toolkits/new')
        .send(toolkit)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have.property('errors');
          res.body.error.errors.should.have.property('authorName');
          res.body.error.errors.authorName.should.have.property('kind').eql('required');
          done();
        });
    });   
    it('it should successfully POST a toolkit', (done) => {
      let toolkit = {
	name: "baz",
        author: "foo",
        description: "bar baz quay",
        authorAffiliation : "fooford",
        authorEmail : "foo@bar.baz",
        authorName : "foo baz",
        authorOrcid : "http://orcid/foo",
        tags: ['foo', 'bar', 'baz'],
        datName: "fooDat",
        datHash: "fooHash",
	uuid: "uuid",
        revision: 0,
        revisionNotes: "revisionNotes",
        toolkit: "toolkit",

      };
      chai.request(server)
        .post('/toolkits/new')
        .send(toolkit)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('author');
          res.body.data.should.have.property('name');
          res.body.data.should.have.property('description');
          res.body.data.should.have.property('authorEmail');
          res.body.data.should.have.property('authorName');
          res.body.data.should.have.property('datName');
          res.body.data.should.have.property('datHash');
          res.body.data.should.have.property('tags');
          res.body.data.should.have.property('authorOrcid');
          res.body.data.should.have.property('authorAffiliation');
          done();
        });
    });    
  });

  describe('/GET /toolkits/:recordId', () => {
    it('it should GET a toolkit by id', (done) => {
      let toolkit = new VirtualPart({
	name: "baz",
        author: "foo",
        description: "bar baz quay",
        authorAffiliation : "fooford",
        authorEmail : "foo@bar.baz",
        authorName : "foo baz",
        authorOrcid : "http://orcid/foo",
        tags: ['foo', 'bar', 'baz'],
        datName: "fooDat",
        datHash: "fooHash",
	uuid: "uuid",
        revision: 0,
        revisionNotes: "revisionNotes",
        toolkit: "toolkit",
   
      });
      toolkit.save((error, toolkit) => {
        if (error) { 
          console.log(error); 
          done();
        } else {
          let route = `/toolkits/${toolkit._id}`;
          chai.request(server)
            .get(route)
            .send(toolkit)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('data');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('author');
              res.body.data.should.have.property('name');
              res.body.data.should.have.property('description');
              res.body.data.should.have.property('authorEmail');
              res.body.data.should.have.property('authorName');
              res.body.data.should.have.property('datName');
              res.body.data.should.have.property('datHash');
              res.body.data.should.have.property('tags');
              res.body.data.should.have.property('authorOrcid');
              res.body.data.should.have.property('authorAffiliation');
              done();
            });
          }    
      });
    });
  });

  describe('/POST /toolkits/:recordId/edit', () => {
    it('it should UPDATE toolkit by id', (done) => {
      let toolkit = new VirtualPart({
	author: "foo",
	name: "baz",
        description: "bar baz quay",
        authorAffiliation : "fooford",
        authorEmail : "foo@bar.baz",
        authorName : "foo baz",
        authorOrcid : "http://orcid/foo",
        tags: ['foo', 'bar', 'baz'],
        datName: "fooDat",
        datHash: "fooHash",
	uuid: "uuid",
        revision: 0,
        revisionNotes: "revisionNotes",
        toolkit: "toolkit",
   
      });
      toolkit.save((error, toolkit) => {
        if (error) { console.log(error) }
        let route = `/toolkits/${toolkit._id}/edit`;
        chai.request(server)
          .post(route)
          .send({
            author: "foo2",
            name: "baz2",
            description: "bar baz quay2",
            authorAffiliation : "fooford2",
            authorEmail : "foo@bar.baz2",
            authorName : "foo baz2",
            authorOrcid : "http://orcid/foo2",
            tags: ['foo2', 'bar', 'baz'],
            datName: "fooDat2",
            datHash: "fooHash2",
	    uuid: "uuid",
            revision: 0,
            revisionNotes: "revisionNotes",
            toolkit: "toolkit",
     
          })
          .end((err, res) => {
            if (err) { console.log(err) }
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('data');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('author').eql('foo2');
              res.body.data.should.have.property('name').eql('baz2');
              res.body.data.should.have.property('description').eql('bar baz quay2');
              res.body.data.should.have.property('authorAffiliation').eql('fooford2');
              res.body.data.should.have.property('authorEmail').eql('foo@bar.baz2');
              res.body.data.should.have.property('authorName').eql('foo baz2');
              res.body.data.should.have.property('authorOrcid').eql('http://orcid/foo2');
              res.body.data.should.have.property('tags').eql(['foo2', 'bar', 'baz']);
              res.body.data.should.have.property('datName').eql('fooDat2');
              res.body.data.should.have.property('datHash').eql('fooHash2');
              done();
          });
      });
    });
  });

  describe('/POST /toolkits/:recordId/remove', () => {
    it('it should DELETE toolkit by id', (done) => {
      let toolkit = new VirtualPart({
	    name: "baz",
            author: "foo",
            description: "bar baz quay",
            authorAffiliation : "fooford",
            authorEmail : "foo@bar.baz",
            authorName : "foo baz",
            authorOrcid : "http://orcid/foo",
            tags: ['foo', 'bar', 'baz'],
            datName: "fooDat",
            datHash: "fooHash",
	    uuid: "uuid",
            revision: 0,
            revisionNotes: "revisionNotes",
            toolkit: "toolkit",

      });
      toolkit.save((error, toolkit) => {
        let route = `/toolkits/${toolkit._id}/remove`;
        chai.request(server)
          .post(route)
          .end((err, res) => {
            if (err) { console.log(err) }
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('The record was successfully removed.');
            done();
          });
      });
    });
  });

});
