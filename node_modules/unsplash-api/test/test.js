'use strict';

var chai = require('chai');
var api = require('../index.js');

require('dotenv').load();
chai.should();

describe('Unsplash API public endpoints', function() {
  api.init(process.env.CLIENT_ID);

  describe('User', function() {
    describe('getUserPhotos', function() {
      it('should return without err and with an empty array', function(done) {
        api.getUserPhotos('fletcher_hills', function(err, photos) {
          if (err) return done(err);

          photos.should.be.instanceOf(Array);

          done();
        });
      });

      it('should return with invalid username error', function(done) {
        api.getUserPhotos('01234', function(err, photos) {

          err.should.exist;
          chai.expect(photos).to.not.exist;

          done();
        });
      })
    });

    describe('getUserByName', function() {
      it('should return without err and with a user', function(done) {
        api.getUserByName('fletcher_hills', function(err, user) {
          if (err) return done(err);

          user.should.be.ok;

          done();
        });
      });

      it('should return with invalid username error', function(done) {
        api.getUserByName('01234', function(err, user) {

          err.should.exist;
          chai.expect(user).to.not.exist;

          done();
        });
      });
    });
  });

  describe('Photos', function() {
     describe('getPhotos', function() {
        it('should return without err and with the first 10 pictures', function(done) {
           api.getPhotos(null, null, function(err, photos, link) {
              if (err) return done(err);
              
              photos.should.be.instanceOf(Array);
              photos.should.have.length(10);

              done();
           });
        });

        it('should return without err and with the first 20 pictures', function(done) {
           api.getPhotos(null, 20, function(err, photos, link) {
               if (err) return done(err);
               
               photos.should.be.instanceOf(Array);
               photos.should.have.length(20);

               done();
           });
        });

        it('should return without err and with the second 10 pictures', function(done) {
           api.getPhotos(2, null, function(err, photos, link) {
               if (err) return done(err);
               
               photos.should.be.instanceOf(Array);
               photos.should.have.length(10);

               link.should.contain('<https://api.unsplash.com/photos?page=1>; rel="prev",');

               done();
           });
        });
     });
     
     describe('searchPhotos', function() {
        it('should return without err and with the first 10 pictures from query "beach"', function(done) {
           api.searchPhotos('beach', null, null, null, function(err, photos, link) {
              if (err) return done(err);
              
              photos.should.be.instanceOf(Array);
              photos.should.have.length(10);
              
              link.should.contain('query=beach');
              
              done();
           });
        });
        
        it('should return first 10 pictures from query "beach" with "nature" category applied', function(done) {
           api.searchPhotos('beach', [4], null, null, function(err, photos, link) {
              if (err) return done(err);
              
              photos.should.be.instanceOf(Array);
              photos.should.have.length(10);
              
              link.should.contain('query=beach');
              link.should.contain('category=4');
              
              done();
           });     
        });
        
        it('should return 10 pictures from query "beach" with "nature" and "people" categories applied', function(done) {
           api.searchPhotos('beach', [4, 6], null, null, function(err, photos, link) {
              if (err) return done(err);
              
              photos.should.be.instanceOf(Array);
              photos.should.have.length(10);
              
              link.should.contain('query=beach');
              
              done();
           });     
        });
        
        it('should return without err and the second 10 pictures from query "beach"', function(done) {
           api.searchPhotos('beach', null, 2, null, function(err, photos, link) {
              if (err) return done(err);
              
              photos.should.be.instanceOf(Array);
              photos.should.have.length(10);
              
              link.should.contain('<https://api.unsplash.com/photos/search?page=1&query=beach>; rel="prev",');
              
              done();
           });
        });
        
        it('should return without err and with the first 20 pictures from query "beach"', function(done) {
           api.searchPhotos('beach', null, null, 20, function(err, photos, link) {
              if (err) return done(err);
              
              photos.should.be.instanceOf(Array);
              photos.should.have.length(20);
              
              link.should.contain('query=beach');
              
              done();
           });
        });
        
        it('should return with invalid query error', function(done) {
           api.searchPhotos(null, null, null, null, function(err, photos, link) {
              err.should.exist;
              chai.expect(photos).to.not.exist;
              chai.expect(link).to.not.exist;
              
              done();
           });
        });
     });
     
     describe('getPhoto', function() {
        it('should return without err and single photo from account "cacobjopus"', function(done) {     
           api.getPhoto('9gkKZO-xezM', null, null, null, function(err, photo) {
              if (err) return done(err);
              
              photo.should.be.ok;
              photo.id.should.equal('9gkKZO-xezM');
              
              done();
           });
        });
        
        it('should return without err and single photo with custom width', function(done) {
           api.getPhoto('9gkKZO-xezM', 500, null, null, function(err, photo) {
              if (err) return done(err);
              
              photo.should.be.ok;
              photo.id.should.equal('9gkKZO-xezM');
              photo.urls.custom.should.be.ok;
              
              done();
           });
        });
        
        it('should return without err and single photo with custom height', function(done) {
           api.getPhoto('9gkKZO-xezM', null, 250, null, function(err, photo) {
              if (err) return done(err);
              
              photo.should.be.ok;
              photo.id.should.equal('9gkKZO-xezM');
              photo.urls.custom.should.be.ok;
              
              done();
           });
        });
        
        it('should return without err and single photo with custom dimensions', function(done) {
           api.getPhoto('9gkKZO-xezM', null, null, [10, 10, 500, 250], function(err, photo) {
              if (err) return done(err);
          
              photo.should.be.ok;
              photo.id.should.equal('9gkKZO-xezM');
              photo.urls.custom.should.be.ok;
              
              done();
           });
        });
        
        it('should return invalid id err', function(done) {
           api.getPhoto('1', null, null, null, function(err, photo) {
              err.should.exist;
              chai.expect(photo).to.not.exist;
              
              done();
           });
        });
     });
  });

  describe('Categories', function() {
    describe('getAllCategories', function() {
      it('should return without err and an array of categories', function(done) {
        api.getAllCategories(function(err, cats) {
          if (err) return done(err);

          cats.should.be.instanceOf(Array);

          done();
        });
      })
    });

    describe('getCategory', function() {
      it('should return without err and category #2 info', function(done) {
        api.getCategory(2, function(err, category) {
          if (err) return done(err);

          category.should.be.ok;
          category.id.should.equal(2);

          done();
        });
      });

      it('should return with invalid ID error', function(done) {
        api.getCategory(-1, function(err, category) {
          err.should.exist;
          chai.expect(category).to.not.exist;

          done();
        });
      });
    });

    describe('getCategoryPhotos', function() {
      it('should return without err and an array of the first 10 photos', function(done) {
        api.getCategoryPhotos(2, null, null, function(err, photos, link) {
          if (err) return done(err);

          photos.should.be.instanceOf(Array);
          photos.should.have.length(10);
          link.should.be.ok;

          done();
        });
      });
      
      it('should return without err and an array of the second 10 photos', function(done) {
         api.getCategoryPhotos(2, 2, null, function(err, photos, link) {
            if (err) return done(err);
            
            photos.should.be.instanceOf(Array);
            photos.should.have.length(10);
            link.should.be.ok;
            link.should.contain('<https://api.unsplash.com/categories/2/photos?page=3>; rel="next"');
            
            done();
         });
      });
      
      it('should return without err and an array of the first 20 photos', function(done) {
         api.getCategoryPhotos(2, null, 20, function(err, photos, link) {
            if (err) return done(err);
            
            photos.should.be.instanceOf(Array);
            photos.should.have.length(20);
            link.should.be.ok;
            
            done();
         });
      });

      it('should return with an invalid ID error', function(done) {
        api.getCategoryPhotos(-1, null, null, function(err, photos, link) {
          err.should.exist;

          chai.expect(photos).to.not.exist;
          chai.expect(link).to.not.exist;

          done();
        });
      });
    });
  });
  
  describe('Curated Batches', function() {
     describe('getCuratedBatches', function() {
        it('should return without err and the first page of 10 curated batches', function(done) {
           api.getCuratedBatches(null, null, function(err, batches, link) {
              if (err) return done(err);
              
              batches.should.be.instanceOf(Array);
              batches.should.have.length(10);
              
              done();
           });
        });
        
        it('should return without err and the second page of 10 curated batches', function(done) {
           api.getCuratedBatches(2, null, function(err, batches, link) {
              if (err) return done(err);
              
              batches.should.be.instanceOf(Array);
              batches.should.have.length(10);
              link.should.contain('<https://api.unsplash.com/curated_batches?page=3>; rel="next"');
              
              done();
           });
        });
        
        it('should return without err and the first page of 20 curated batches', function(done) {
           api.getCuratedBatches(null, 20, function(err, batches, link) {
              if (err) return done(err);
              
              batches.should.be.instanceOf(Array);
              batches.should.have.length(20);
              
              done();
           });
        });
     });
     
     describe('getCuratedBatch', function() {
        it('should return without err and a curated batch object', function(done) {
           api.getCuratedBatch(1, function(err, batch) {
              if (err) return done(err);
              
              batch.should.be.ok;
              batch.id.should.equal(1);
              
              done();
           });
        });
        
        it('should return with an invalid ID error', function(done) {
           api.getCuratedBatch(-1, function(err, batch) {
              err.should.exist;
              
              chai.expect(batch).to.not.exist;
              
              done();
           });
        });
     });
     
     describe('getCuratedBatchPhotos', function() {
        it('should return without err and an array of 10 photos', function(done) {
           api.getCuratedBatchPhotos(1, function(err, photos) {
              if (err) return done(err);
              
              photos.should.be.instanceOf(Array);
              photos.should.have.length(10);
              
              done();
           });
        });
        
        it('should return with an invalid ID error', function(done) {
           api.getCuratedBatchPhotos(-1, function(err, photos) {
              err.should.exist;
              
              chai.expect(photos).to.not.exist;
              
              done();
           });
        });
     });
  });
  
  describe('Stats', function() {
     describe('getTotalStats', function() {
        it('should return with an object of all downloads', function(done) {
           api.getTotalStats(function(err, stats) {
              if (err) return done(err);
              
              stats.should.exist;
              
              done();
           });
        });
     });
  });
});