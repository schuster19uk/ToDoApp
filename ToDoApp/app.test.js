const { app  } = require('./index');

const request = require('supertest');



test("Database/Table exists", async () => {
    //const post = await Post.create({ name: "Post 1", content: "Lorem ipsum" });
  
    await request(app).get("/")
      .expect(200)
      .then((response) => {
        // Check type and length
        console.log(response.body);
/*         expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].title).toBe(post.title);
        expect(response.body[0].content).toBe(post.content); */
      });
  });


  test('test post', async() => {

        await request(app)
            .post("/create")
            .send()
            .catch(err => {
                // write test for failure here
                console.log(`Error ${err}`)
                done()
            });
    
});