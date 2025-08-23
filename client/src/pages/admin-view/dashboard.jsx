import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }
  
  // Done by mySelf
  function handleDeleteFeatureImage(deletedImage){
    dispatch(deleteFeatureImage(deletedImage._id)).then((data) => {
      if (data?.payload?.success) {
      toast.error("Feature Banner Image deleted successfully")
      dispatch(getFeatureImages()); // ✅ correctly dispatch it
    }
  });
    
  }
  
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);


  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 lg:w-[80dvw] w-full">
        Upload
      </Button>

      <div className="flex flex-row gap-8 mt-16 flex-wrap justify-between">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
            
              <div className="relative flex flex-col gap-y-0.5 w-full lg:aspect-[211/35">
                <img
                  src={featureImgItem.image}
                  className="w-full rounded-t-lg max-h-lg"
                  // className="w-full aspect-[211/35] object-cover rounded-t-lg"

                  />
              <Button onClick={()=>handleDeleteFeatureImage(featureImgItem)}>Delete</Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;