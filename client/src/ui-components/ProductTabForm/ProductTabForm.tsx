import { Input } from "@/components/Input/Input";
import styles from "@/components/Modal/Modal.module.scss";
import { SelectField } from "@/components/SelectField/SelectField";
import { Brand, Category, ProductData } from "@/types";
import { handleInput } from "@/utils/formHandlers";

export const ProductTabForm = ({
  createMode,
  setCreateMode,
  handleSubmit,
  handleInfo,
  productData,
  setProductData,
  data,
  brands,
  categories,
}) => {
  return (
    <form className={styles.tabContent} onSubmit={handleSubmit}>
      <Input
        label="Edit existing product"
        name="edit"
        type="checkbox"
        value={createMode}
        onChange={() => setCreateMode((prev: boolean) => !prev)}
      />
      {!createMode && (
        <>
          <Input
            label="Product Id"
            required={true}
            type="text"
            placeholder="Enter product id to start searching"
            name="id"
            value={productData.id || ""}
            onChange={(e) => handleInput(e, setProductData)}
          />
          {data?.message && <span>{data.message}</span>}
        </>
      )}
      <Input
        label="Name"
        required
        type="text"
        placeholder="Enter product name"
        name="name"
        value={productData.name}
        onChange={(e) => handleInput(e, setProductData)}
      />
      <Input
        label="Price"
        required
        type="number"
        placeholder="Enter product price"
        name="price"
        value={productData.price}
        onChange={(e) => {
          const value = e.target.value;
          if (Number(value) > 0 || value === "") {
            handleInput(e, setProductData);
          }
        }}
      />
      <div className={styles.inputWrap}>
        <label htmlFor="gender" className={styles.label}>
          Image
        </label>
        <label className={styles.inputLabel}>
          <input
            id="upload-btn"
            required={createMode}
            type="file"
            name="img"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setProductData({ ...productData, img: file });
            }}
          />
          <span>{productData.img ? productData.img.name : "Upload Image"}</span>
        </label>
      </div>
      <SelectField
        label="Gander"
        required={true}
        name="gender"
        id="gender"
        onChange={(e) => handleInput(e, setProductData)}
        value={productData.gender}
        options={[
          { value: "female", label: "female" },
          { value: "male", label: "male" },
        ]}
      />
      <SelectField
        label="Brand"
        name="brandId"
        id="brandId"
        onChange={(e) => handleInput(e, setProductData)}
        required={true}
        value={productData.brandId}
        options={
          brands?.map((b: Brand) => ({ value: b.id, label: b.name })) || []
        }
      />
      <SelectField
        label="Category"
        required={true}
        name="categoryId"
        onChange={(e) => handleInput(e, setProductData)}
        value={productData.categoryId}
        options={categories?.map((c: Category) => ({
          value: c.id,
          label: c.name,
        }))}
      />
      <label className={`${styles.label} ${styles.label_info}`}>
        Product Info
      </label>
      {productData.info.map((i, index) => (
        <div className={styles.inputWrap}>
          <div className={styles.label}>Title</div>
          <div className="">"{i.title}"</div>
          <div className={styles.label}>Description</div>
          {i.title === "details" && (
            <span className={styles.label}>
              {" "}
              Please list the characteristics by separating them with a comma
            </span>
          )}
          <textarea
            name="description"
            id=""
            onChange={(e) => handleInfo(index, e)}
            rows={4}
            value={i.description}
          />
        </div>
      ))}
      <Input
        label="Discount"
        name="discount"
        type="number"
        value={productData.discount || ""}
        onChange={(e) => {
          const value = e.target.value;
          if (Number(value) > 0 || value === "") {
            handleInput(e, setProductData);
          }
        }}
      />
      {productData.discount !== 0 && (
        <>
          <Input
            label="Discount Start Date"
            name="discountStartDate"
            type="date"
            value={productData.discountStartDate || ""}
            onChange={(e) => handleInput(e, setProductData)}
          />
          <Input
            label="Discount End Date"
            name="discountEndDate"
            type="date"
            value={productData.discountEndDate || ""}
            onChange={(e) => handleInput(e, setProductData)}
          />
        </>
      )}
      <button type="submit" className={`primary-btn ${styles.tabContent_btn}`}>
        {createMode ? "Create" : "Update info"}
      </button>
    </form>
  );
};
