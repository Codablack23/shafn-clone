const imageFiles = [20, 50, 100];
const _imageFiles = [10, 50, 99];

const totalProgress = imageFiles.length * 100;
let currentProgress = 0;
let currentIndex = 0;
let minCurrentProgress = currentIndex * 100;

const handleUploadProgress = (index, _progress) => {
  if (index > currentIndex) {
    currentIndex = index;
    minCurrentProgress = index * 100;
  }
  currentProgress = minCurrentProgress + _progress;

  const progress = (currentProgress / totalProgress) * 100;
  console.log(`Progress >> ${progress.toFixed(2)}%`);
  if (currentProgress === totalProgress) {
    console.log("Progress completed!");
  }
};

imageFiles.forEach((file, index) => {
  handleUploadProgress(index, file);
});
