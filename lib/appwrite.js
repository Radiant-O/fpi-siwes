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
  platform: "com.radiant.siwes",
  projectId: "672c7271000308f6057f",
  databaseId: "672c7477000a95c7681a",
  userCollectionId: "672c74af001c178e0cd7",
  //   videosCollectionId: "67238c5f002cf057838a",
  //   auraFilesStorageId: "67238fe40036488527cf",
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// export const STATUS = {
//   USER: ["pending", "active", "completed"],
//   SUBMISSION: ["pending", "approved", "rejected"],
//   VISIT: ["scheduled", "completed", "cancelled"],
//   DOCUMENT: ["pending", "submitted", "approved", "rejected"],
// };

// const isValidStatus = (statusType, value) => {
//   return STATUS[statusType].includes(value);
// };

export const registerStudent = async (studentData) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      studentData.mail,
      studentData.password,
      studentData.fullName
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(studentData.fullName);

    // await SignalIcon(studentData.email, studentData.password)
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        userId: newAccount.$id,
        userType: "student",
        avartar: avatarUrl,
        fullName: studentData.fullName,
        email: studentData.mail,
        matricNumber: studentData.matric,
        department: studentData.department,
        level: studentData.level,
        companyName: studentData.companyName,
        companyAddress: studentData.companyAdd,
        supervisor: null,
        startDate: null,
        endDate: null,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
    return newUser;
  } catch (e) {
    throw new Error(e);
  }
};
export const registerSupervisor = async (supervisorData) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      supervisorData.mail,
      supervisorData.password,
      supervisorData.fullName
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(supervisorData.fullName);

    // await SignalIcon(supervisorData.email, supervisorData.password)
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        userId: newAccount.$id,
        userType: "supervisor",
        avatar: avatarUrl,
        fullName: supervisorData.fullName,
        email: supervisorData.mail,
        department: supervisorData.department,
        phoneNumber: supervisorData.phoneNumber,
        assignedStudents: [],
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
    return newUser;
  } catch (e) {
    throw new Error(e);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    // const user = await account.get();

    // const userProfile = await databases.listDocuments(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.userCollectionId,
    //   [Query.equal("userId", user.$id)]
    // );

    // if (!userProfile.documents.length) {
    //   throw new Error("User Profile not Found");
    // }

    return session ;
  } catch (e) {
    throw new Error(e);
  }
};

export const getAccount = async () => {
  try {
    const user = await account.get();

    return user;
  } catch (e) {
    throw new Error(e);
  }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await getAccount();
        console.log(currentAccount)

    if (!currentAccount) throw Error;

    const userProfile = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("userId", currentAccount.$id)]
    );

        console.log("user:", userProfile)
    if (!userProfile) {
      throw new Error("User Profile not Found");
    }

        return userProfile.documents[0];
  } catch (e) {
    throw new Error(e);
  }
};
