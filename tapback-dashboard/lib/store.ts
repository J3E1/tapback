import { IProject } from '@/typings/types';
import { create } from 'zustand';

type ProjectsStore = {
	projects: IProject[];
	setProjects: (projects: IProject[]) => void;
	removeAllProjects: () => void;
};

export const useProjects = create<ProjectsStore>(set => ({
	projects: [],
	setProjects: (projects: IProject[]) => set({ projects }),
    removeAllProjects: () => set({ projects: [] }),
}));
