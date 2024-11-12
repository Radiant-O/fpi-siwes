import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.radiant.siwes",
  projectId: "672c7271000308f6057f",
  databaseId: "672c7477000a95c7681a",
  userCollectionId: "672c74af001c178e0cd7",
  dailylogCollectionId: "672e992f0018dca026ea",
  weeklyreportCollectionId: "672f2ffe0012f2137986",
  siwesFilesStorageId: "672ec0920031b53bc13d",
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

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

    const supervisor = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal('userType', 'supervisor'),
        Query.equal('department', studentData.department)
      ]
    );

    let supervisorId = null;
    let supervisorName = null;
    
    if (supervisor.documents.length > 0) {
      supervisorId = supervisor.documents[0].$id;
      supervisorName = supervisor.documents[0].fullName;
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 16 * 7);

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
        supervisor: supervisorId,
        supervisorName: supervisorName,
        grades: "0",
        letterGrade: 'Pending',
        technicalReport: "Not Submitted",
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status: supervisorId ? 'active' : "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );

    if (supervisorId) {
      const supervisor = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        supervisorId
      );

      const assignedStudents = [
        ...(supervisor.assignedStudents || []),
        newAccount.$id,
      ];

      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        supervisorId,
        {
          assignedStudents
        }
      );
    }
    return newUser;
  } catch (e) {
    throw new Error(e);
  }
};

export const registerSupervisor = async (supervisorData) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      supervisorData.email,
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
        avartar: avatarUrl,
        fullName: supervisorData.fullName,
        email: supervisorData.email,
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
    return session;
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

    if (!currentAccount) throw Error;

    const userProfile = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("userId", currentAccount.$id)]
    );

    if (!userProfile) {
      throw Error;
    }

    return userProfile.documents[0];
  } catch (e) {
    throw new Error(e);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.siwesFilesStorageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw new Error();

    return fileUrl;
  } catch (e) {
    throw new Error(e);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const { mimeType, ...rest } = file;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.siwesFilesStorageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (err) {
    throw new Error(err);
  }
};

export const uploadDailylog = async (form) => {
  try {
    const [logImgUrl] = await Promise.all([uploadFile(form.logImage, "image")]);

    const newLog = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.dailylogCollectionId,
      ID.unique(),
      {
        activities: form.activities,
        learnings: form.learnings,
        challenges: form.challenges,
        createdAt: new Date().toISOString(),
        logImg: logImgUrl,
        studentId: form.studentId,
        
      }
    );

    return newLog;
  } catch (err) {
    throw new Error(err);
  }
};

export const uploadWeeklylog = async (form) => {
  try {
    const newLog = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.weeklyreportCollectionId,
      ID.unique(),
      {
        weekNumber: form.weekNumber,
        summary: form.summary,
        skills: form.skills,
        challenges: form.challenges,
        submissiondate: new Date().toISOString(),
        studentId: form.studentId,
        studentMatric: form.studentMatric,
        department: form.department,
        feedback: null,
        status: "Pending",
      }
    );

    return newLog;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchDailyLog = async (id) => {
  try {
    const res = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.dailylogCollectionId,
      [
        Query.equal("studentId", id),
        Query.orderDesc("$createdAt")
      ]
    );
    return res.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchWeeklyProgress = async (studentId) => {
  try {
    const res = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.weeklyreportCollectionId,
      [
        Query.equal("studentId", studentId),
        Query.orderAsc("weekNumber")
      ]
    );
    return res.documents;
  } catch (e) {
    throw new Error(e);
  }
};
export const pendingReports  = async (department) => {
  try {
    const res = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.weeklyreportCollectionId,
      [
        Query.equal("status", "Pending"),
        Query.equal("department", department),
        Query.orderDesc("$createdAt")
      ]
    );
    return res.documents;
  } catch (e) {
    throw new Error(e);
  }
};
export const assignedStudents  = async (department) => {
  try {
    const res = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal("userType", "student"),
        Query.equal("department", department),
        Query.orderDesc("$createdAt"),
      ]
    );
    return res.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const getSession = async () => {
  try {
    const session = await account.getSession("current");

    return session;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchStudent = async (id) => {
  try {

    const res = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal('userType', "student"),
        Query.equal('supervisor', id )
      ]
    )
    return res.documents;
  } catch (e) {
    throw new Error(e)
  }
}

export const approveWeeklyReport = async (reportId, feedback = "") => {
  try {
    const res = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.weeklyreportCollectionId,
      reportId,
      {
        status: "approved",
        feedback,
      }
    );
    return res
  } catch (e) {
    throw new Error(e);
  }
};

export const loadReport = async (documentId) => {
  try {
    const res = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.weeklyreportCollectionId,
      documentId,
    );
    return res;
  } catch (e) {
    throw new Error(e)
  }
}

export const loadStudentDetails = async (studentId) => {
  try {
    const res = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      studentId,
    );
    return res;
  } catch (e) {
    throw new Error(e)
  }
}

export const submitGrade = async (studentId, aggTotal, letterGrade) => {
  try {
    const res = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      studentId,
      {
        grades: aggTotal,
        letterGrade: letterGrade,
        technicalReport: "Approved",
      }
    )
    return res;
  } catch (e) {
    throw new Error(e)
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (err) {
    throw new Error(err);
  }
};
