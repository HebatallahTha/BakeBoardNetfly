export function getPosts() {
  return JSON.parse(localStorage.getItem("bakeboard_posts") || "[]");
}

export function savePosts(posts) {
  localStorage.setItem("bakeboard_posts", JSON.stringify(posts));
}

export function getPostById(id) {
  const posts = getPosts();
  return posts.find(post => post.id === id);
}

export function updatePostById(id, updatedData) {
  const posts = getPosts().map(p => p.id === id ? { ...p, ...updatedData } : p);
  savePosts(posts);
}

// New function to delete a post by its ID
export function deletePostById(id) {
  // Filter out the post with the matching ID
  const posts = getPosts().filter(post => post.id !== id);
  // Save the new array of posts back to local storage
  savePosts(posts);
}

export function generateId() {
  // It's more robust to use a UUID
  return crypto.randomUUID();
}
