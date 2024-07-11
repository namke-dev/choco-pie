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

// Register
export const createChocoAccount = async (email, password, username) => {
  try {
    console.log("==> Create choco account");

    //crate user app write account
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error("==> cannot create user app write account");

    const avatarUrl = avatars.getInitials(username);
    const userData = createUserInDatabases(
      newAccount.$id,
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
    console.log("==> signIn");

    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("Error while trying to Sign in");
    throw new Error(error);
  }
};

//Get current user
export const getCurrentUser = async () => {
  console.log("==> getCurrentUser");

  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error("==> Can't get getCurrentUser");

    console.log("==> start authen...");
    const userData = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("account_id", currentAccount.$id)]
    );
    console.log("==> finish authen...");

    if (!userData || !userData.documents == 0)
      throw Error("==> authen fail, account_id not match");

    console.log("==> getCurrentUser: " + JSON.stringify(userData.documents[0]));
    return userData.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Get Account
export async function getAccount() {
  console.log("==> getAccount ");
  try {
    const currentAccount = await account.get();
    console.log(
      "==> current account:",
      JSON.stringify(currentAccount, null, 2)
    );

    return currentAccount;
  } catch (error) {
    console.log("==> Error while trying to getAccount ");
    throw new Error(error.message);
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
}
