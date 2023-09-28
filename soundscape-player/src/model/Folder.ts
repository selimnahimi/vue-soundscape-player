export default class Folder {
    folders: Folder[] = [];
    files: File[] = [];

    addFolder(folder: Folder) {
        this.folders.push(folder);
    }

    addFile(file: File) {
        this.files.push(file);
    }
}