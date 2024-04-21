import prisma from "../config/db.config.js";

export class UserController {
  static async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select:{
            id:true,
            name:true,
            email:true
        }
      });
      return res.json({ user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getUsers(req,res){
    const {userIds} = req.body;

    const users = await prisma.user.findMany({
        where:{
            id:{
                in:userIds,
            },
        },
        select:{
            id:true,
            name:true,
            email:true
        }
    })

    return res.json({users});
  }
}
