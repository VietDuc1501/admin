interface NewSubmission {
  title: string;
  content: string;
  courseId: string;
  studentId: string;
}

const createSubmissionApi = async (submission: NewSubmission): Promise<any> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create submission");
    }
    return data;
  } catch (error) {
    console.error("Error creating submission:", error);
    throw error;
  }
};

export default createSubmissionApi;