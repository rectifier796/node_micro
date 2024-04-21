import prisma from "../config/db.config.js";
import axios from 'axios';

class PostController {
  static async index(req, res) {
    try {
      const posts = await prisma.post.findMany({});

    //   console.log(posts);

    //   ***Method 1 - inefficient
    // let postWithUsers = await Promise.all(
    //     posts.map(async(post)=>{
    //         const res = await axios.get(
    //             `${process.env.AUTH_MICRO_URL}/api/getUser/${post.user_id}`
    //         );

    //         return {
    //             ...post,
    //             ...res.data
    //         }
    //     })
    // )

    //  ***Method 2 - Better Approach
    // let userIds = [];
    // posts.forEach((item)=>{
    //     userIds.push(item.user_id);
    // })

    // const response = await axios.post(`${process.env.AUTH_MICRO_URL}/api/getUsers`,new Set(userIds));

    // const users = response.data.users;

    // let postWithUsers = await Promise.all(
    //     posts.map((post)=>{
    //         const user = users.find((item)=> item.id === post.user_id);

    //         return {
    //             ...post,
    //             user
    //         }
    //     })
    // )

    // ***Method 3 - Optimised
    let userIds = [];
    posts.forEach((item)=>{
        userIds.push(item.user_id);
    })

    const response = await axios.post(`${process.env.AUTH_MICRO_URL}/api/getUsers`,new Set(userIds));

    const users = {};
    response.data.users.forEach((item)=>{
        users[item.id] = item;
    })

    let postWithUsers = await Promise.all(
        posts.map((post)=>{
            const user = users[post.user_id];

            return {
                ...post,
                user
            }
        })
    )

      return res.json({ postWithUsers });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async store(req, res) {
    try {
      const authUser = req.user;
      const { title, content } = req.body;

      const post = await prisma.post.create({
        data: {
          user_id: authUser.id,
          title,
          content,
        },
      });

      return res.json({ message: "Post created successfully", post });
    } catch (err) {
      console.log(err);
      return res.json(500).json({ message: "Internal Server Error" });
    }
  }
}

export default PostController;
