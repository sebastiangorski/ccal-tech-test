import { Idea } from '@ccal-apps/core';

export class CreateIdea {
  static readonly type = '[Idea] Add idea';
  constructor(public idea: Idea) {}
}

export class RemoveIdea {
  static readonly type = '[Idea] Remove idea';
  constructor(public ideaId: string) {}
}

export class UpdateIdea {
  static readonly type = '[Idea] Update idea';
  constructor(public idea: Idea) {}
}

export class SortIdeasByName {
  static readonly type = '[Idea] Sort ideas by name';
  constructor(public ideas: Idea[]) {}
}

export class SortIdeasByDate {
  static readonly type = '[Idea] Sort ideas by date';
  constructor(public ideas: Idea[]) {}
}

export class FilterIdeasByTags {
  static readonly type = '[Idea] Filter ideas by tag';
  constructor(public ideas: Idea[], public tagIds: string[]) {}
}

export class FilterIdeasById {
  static readonly type = '[Idea] Filter ideas by id';
  constructor(public ideas: Idea[], public ideaId: string) {}
}
