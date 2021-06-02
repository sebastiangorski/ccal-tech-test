import { Idea } from '@ccal-apps/core';

export function sortIdeasByName(ideas: Idea[]): Idea[] {
  return ideas.slice().sort((a, b) => (a.name > b.name) ? 1 : -1);
}

export function sortIdeasByDate(ideas: Idea[]): Idea[] {
  return ideas.slice().sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
}

export function getIdeaById(ideas: Idea[], ideaId: string): Idea[] {
  if (ideaId !== null) {
    return ideas.filter(idea => idea.id === ideaId);
  } else {
    return ideas;
  }
}

export function filterIdeasByTagIds(ideas: Idea[], tagIds: string[]): Idea[] {
  let filteredIdeas = ideas.filter(idea => {
    return idea.tagIds.some(id => tagIds.includes(id));
  });
  if (tagIds.length === 0) {
    return ideas;
  } else {
    return filteredIdeas;
  }
}
