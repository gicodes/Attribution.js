const request = require('supertest');
const app = require('./attr.app'); // Import your Express app

// Use a wrapper function to handle dynamic imports
async function runTests() {
  // Dynamically import chai
  const { expect } = await import('chai');

  describe('Attribution API', function () {
    // Test the POST /api/track route
    describe('POST /api/track', function () {
      it('should track an event successfully', async function () {
        const eventData = {
          userId: 'user123',
          campaignId: 'campaign456',
          productId: 'product789',
          eventType: 'click',
          metadata: {
            browser: 'Chrome',
            location: 'Nigeria',
          },
        };

        const res = await request(app)
          .post('/api/track')
          .send(eventData)
          .expect(201);

        // Verify response structure
        expect(res.body).to.have.property('message', 'Event tracked successfully');
        expect(res.body.data).to.include.keys(
          'userId',
          'campaignId',
          'productId',
          'eventType',
          'timestamp',
          'metadata'
        );
        expect(res.body.data.userId).to.equal(eventData.userId);
      });

      it('should return an error for invalid event data', async function () {
        const invalidEventData = {
          userId: 'user123',
          campaignId: 'campaign456',
          // Missing productId and eventType
        };

        const res = await request(app)
          .post('/api/track')
          .send(invalidEventData)
          .expect(500);

        // Verify error message
        expect(res.body).to.have.property('error');
      });
    });
  });
}

// Execute the tests
runTests().catch((err) => {
  console.error('Error running tests:', err);
});
