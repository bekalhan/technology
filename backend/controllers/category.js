const Category = require("../models/category");
const slugify = require("slugify");
const shortid = require("shortid");
const Product = require("../models/product");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

exports.addCategory =async  (req, res) => {
  let categoryName = "none";
  if(req.body.category===''){
    categoryName= "none";
  }
  else{
    const findCategory = await Category.findById(req.body.category);
    categoryName = findCategory.name;
  }
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
    createdBy: req.user._id,
    parentName:categoryName
  };



  if (req.file) {
    categoryObj.categoryImage = "/public/" + req.file.filename;
  }

  if (req.body.category) {
    categoryObj.parentId = req.body.category;
  }

  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
};

exports.getCategoriesByFilter = async (req,res)=>{
    const allCategories = [];
    const categories = await Category.find({});
    for(let i=0;i<categories.length;i++){
      if(categories[i].parentId){
        const parentCategory = await Category.findById(categories[i].parentId);
        const parentCategoryName = parentCategory.name;
        categories[i].parentName = parentCategoryName;
        allCategories.push(categories[i]);
      }
      else{
        categories[i].parentName = "none";
        allCategories.push(categories[i]);
      }
    }
    res.status(200).json({categoryListByFilter:allCategories});
}

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updateCategories: updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};

exports.deleteCategories = async (req, res) => {
  console.log("enter");
  const { ids } = req.body.payload;
  console.log(ids);
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({
      _id: ids[i]._id,
      createdBy: req.user._id,
    });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

exports.deleteCategory = async (req,res)=>{
 const { id } = req.params;
 const allproductBelongCategory = await Product.find({
  category:id
 });
 for(let i=0; i < allproductBelongCategory.length;i++){
    const deletedId = allproductBelongCategory[i]._id.toString();
    await Product.findByIdAndDelete(deletedId);
 }
 const deleteCategory = await Category.findByIdAndDelete(id);
 res.status(200).json({ message: "Category removed" });
}