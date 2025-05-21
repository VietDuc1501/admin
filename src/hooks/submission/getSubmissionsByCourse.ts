const getSubmissionsByCourse = async (courseId: string): Promise<any[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/submissions/course/${courseId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch submissions");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching submissions by course:", error);
    throw error;
  }
};

export default getSubmissionsByCourse;