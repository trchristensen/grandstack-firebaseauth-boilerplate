import { driver } from "../server/neo4j/db";

export async function neo4jVerifyUser(user: any) {
  console.log('user inside neo4j helper', user)

  const session = driver().session();

  session
    .run("MATCH (u:User) WHERE u.id = $id RETURN u as USER", {
      id: user.userId,
    })
    //@ts-ignore
    .then((result: any) => {
      if (result.records.length === 0) {
        return session.run(
          "CREATE (u:User {id: $id, userId: $userId, name: $name, email: $email, isAdmin: false, isPremium: false, avatar: $avatar})",
          {
            id: user.userId,
            userId: user.userId,
            name: user.name,
            email: user.email,
            avatar: user.avatar || null
          }
        ).then((result) => {
          console.log('new record created:', result.records)
          return result.records;
        });
      } else {
        console.log('user exists in db')
        return result.records[0]
      }
    })
    .catch((err) => console.log(err));
}
