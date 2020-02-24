"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AsyncFileManager {
    constructor() {
        this.fs = require('fs');
    }
    statAsync(path) {
        return new Promise((resolve, reject) => {
            this.fs.stat(path, (err, stats) => {
                if (err)
                    reject(err);
                else
                    resolve(stats);
            });
        });
    }
    openAsync(path, flags, mode) {
        return new Promise((resolve, reject) => {
            this.fs.open(path, flags, mode, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    readAsync(fd, buffer, offset, length, position) {
        return new Promise((resolve, reject) => {
            this.fs.read(fd, buffer, offset, length, position, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    closeAsync(fd) {
        return new Promise((resolve, reject) => {
            this.fs.close(fd, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    readFileAsync(path, opts) {
        return new Promise((resolve, reject) => {
            this.fs.readFile(path, opts, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    readDirAsync(dirPath) {
        return new Promise((resolve, reject) => {
            this.fs.readdir(dirPath, (err, files) => {
                if (err)
                    reject(err);
                else
                    resolve(files);
            });
        });
    }
}
exports.AsyncFileManager = AsyncFileManager;
//# sourceMappingURL=asyncFileManager.js.map