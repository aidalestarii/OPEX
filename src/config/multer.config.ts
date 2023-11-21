import { extname } from 'path';
import * as path from 'path'; // Add this line
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';

// Rest of your code...

// Multer upload options
export const multerPdfOptions = {
  // Enable file size limits
  limits: {
    fileSize: 1000000, // 1mb
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
    if (file.mimetype.match(/\/(pdf)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: Express.Multer.File, cb: Function) => {
      const uploadPath = './uploads/pdf';
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },

    //     // // File modification details
    filename: (req: any, file: Express.Multer.File, cb: Function) => {
      const sanitizedOriginalName = file.originalname.replace(
        /[^a-zA-Z0-9.]/g,
        '_',
      );
      //ini ntar uncomment yg masuk ke cb null filename
      //const uploadPath = './uploads/pdf';
      // const fileName = await generateUniqueFileName(
      //   uploadPath,
      //   sanitizedOriginalName,
      // );
      cb(null, sanitizedOriginalName);
    },
  }),
};
// async function generateUniqueFileName(uploadPath, fileName) {
//   let newFileName = fileName;
//   let counter = 1;

//   while (existsSync(`${uploadPath}/${newFileName}`)) {
//     const nameWithoutExt = path.parse(fileName).name;
//     const ext = path.parse(fileName).ext;
//     newFileName = `${nameWithoutExt} (${counter})${ext}`;
//     counter++;
//   }

//   return newFileName;
// }
