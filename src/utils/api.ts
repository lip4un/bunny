export type Photo = {
  id: string;
  url: string;
  modelId: string;
  createdAt: string;
};

export function getPhotosByModel(modelId: string): Photo[] {
  const all = JSON.parse(localStorage.getItem('bunny_photos') || '[]');
  return all.filter((p: Photo) => p.modelId === modelId);
}

export function uploadPhoto(modelId: string, url: string) {
  const all = JSON.parse(localStorage.getItem('bunny_photos') || '[]');
  const newPhoto = { id: Date.now().toString(), url, modelId, createdAt: new Date().toISOString() };
  all.push(newPhoto);
  localStorage.setItem('bunny_photos', JSON.stringify(all));
}

export function subscribeToModel(userId: string, modelId: string) {
  const users = JSON.parse(localStorage.getItem('bunny_users') || '[]');
  const user = users.find((u: any) => u.id === userId);
  if (user && !user.subscribedModels.includes(modelId)) {
    user.subscribedModels.push(modelId);
    localStorage.setItem('bunny_users', JSON.stringify(users));
    if (localStorage.getItem('bunny_user')) {
      localStorage.setItem('bunny_user', JSON.stringify(user));
    }
  }
}

export function isSubscribed(userId: string, modelId: string): boolean {
  const users = JSON.parse(localStorage.getItem('bunny_users') || '[]');
  const user = users.find((u: any) => u.id === userId);
  return user?.subscribedModels?.includes(modelId);
}
