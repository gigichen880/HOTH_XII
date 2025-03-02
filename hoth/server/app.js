import axios from 'axios';

// Create an axios instance with default configuration
const app = {
    axios: axios.create({
      baseURL: 'http://localhost:5000', // Typical Flask default URL
      timeout: 5000,                   // Request timeout in milliseconds
      headers: {
        'Content-Type': 'application/json',
      }
    })
  };


  app.axios.post = async function(url, data, config = {}) {
    try {
      const response = await this({
        method: 'post',
        url: url,
        data: data,
        ...config
      });
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error.response ? error.response.data : error.message,
        status: error.response ? error.response.status : null
      };
    }
  };
  
  // Implement GET function
  app.axios.get = async function(url, config = {}) {
    try {
      const response = await this({
        method: 'get',
        url: url,
        ...config
      });
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error.response ? error.response.data : error.message,
        status: error.response ? error.response.status : null
      };
    }
  };
  
  // Example usage:
  /*
  async function example() {
    // POST example
    const postResult = await app.axios.post('/api/submit', {
      name: 'John',
      value: 42
    });
    console.log(postResult);
  
    // GET example
    const getResult = await app.axios.get('/api/data');
    console.log(getResult);
  }
  */
  
  export default app;
  /*
app.post("/login", async (req, res) => {
    const { username, password } = req.body

    try {
        const checkExist = await student_collection.findOne({ username: username })
        const checkMatch = await student_collection.findOne({ username: username, password: password })
        const userIsClubLeader = await student_collection.findOne({ username: username, userIsClubLeader: true })
        if (!checkExist) {
            res.json("notexist")
        }
        else if (!checkMatch) {
            res.json("notmatch")
        }
        else {
            if (userIsClubLeader) {
                res.json("successLeader")
            }
            else {
                res.json("successStudent")
            }
        }

    }
    catch (e) {
        res.json("fail")
    }

})

*/