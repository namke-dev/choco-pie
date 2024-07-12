import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.chocopie",
  projectId: "668f249600093cbc96ae",
  databaseId: "668f5224003dea21ffba",
  userCollectionId: "668f52570014c17ad222",
  videoCollecitonId: "668f52b70009e5551382",
  storageId: "668f559800135f572907",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
//--------------------------------------
// Register
export const createChocoAccount = async (email, password, username) => {
  try {
    await signOut();
    console.log("==> Create choco account");
    //crate user appwrite credential
    const appWriteCredential = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!appWriteCredential)
      throw Error("==> cannot create appWrite Credential");

    const avatarUrl = avatars.getInitials(username);
    const userData = createUserInDatabases(
      appWriteCredential.$id,
      email,
      username,
      avatarUrl
    );

    return userData;
  } catch (error) {
    console.log("Error while trying to Create account");
    console.log(error.messagge);
  }
};

const createUserInDatabases = async (accountId, email, username, avatarUrl) => {
  try {
    console.log("==> start createUserInDatabases...");
    const result = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        account_id: accountId,
        email: email,
        username: username,
        avatar_url: avatarUrl,
      }
    );

    console.log("==> result: " + JSON.stringify(result));
    return result;
  } catch (error) {
    console.log("Error while trying to save user to DB");
    console.log(error);
  }
};

//Sign in
export const signIn = async (email, password) => {
  try {
    await signOut();

    console.log("==> signIn...");

    const session = await account.createEmailPasswordSession(email, password);
    console.log("==> signIn OK!");

    return session;
  } catch (error) {
    console.log("Error while trying to Sign in" + JSON.stringify(error));
    throw new Error(error.message);
  }
};

// Get Account Session
export async function getAccountSession() {
  console.log("==> getAccountSession ");
  try {
    const accountSession = await account.get();
    return accountSession;
  } catch (error) {
    console.log("==> Error while trying to getAccountSession ");
    throw new Error(error.message);
  }
}

// Sign Out
export async function signOut() {
  try {
    console.log("==> sign out ...");
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log("==> can't sign out! " + JSON.stringify(error));
  }
}

//---------------------------------------

//Get current user
export const getCurrentUser = async () => {
  console.log("==> getCurrentUser");

  try {
    const currentUser = await getAccountSession();
    if (!currentUser) throw Error("==> Can't get getCurrentUser");

    const userData = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("account_id", currentUser.$id)]
    );
    console.log("acocunt_id: " + currentUser.$id);
    if (!userData)
      throw Error("==> ERROR: account_id in session did not match");

    return userData.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollecitonId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLastestPost = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollecitonId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error.message);
  }
};
