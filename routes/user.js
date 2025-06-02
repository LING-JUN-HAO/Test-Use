const app = require('express');
const { dataSource } = require('../db/data-source');
const router = app.Router();

/**
 * 路由中介處理程序
 */
const logHandler = (req, res, next) => {
  console.log(`進入了路由：${req.method} ${req.originalUrl}`);
  next();
};

/**
 * 測試路由(測試錯誤處理器是否有作用)
 */
router.get('/test', logHandler, (req, res) => {
  TD(); //故意設置錯誤，讓進入 Test 路由的請求進到下面的錯誤處理
  res.send('測試使用的路徑');
});

/**
 * 編輯用戶個人資料，使用路由參數
 */
router.get('/edit-profile/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(`修正的用戶編號是：${userId}`);
});

/**
 * 編輯用戶照片功能，使用查詢參數
 */
router.get('/edit-image', (req, res) => {
  const { userId, category } = req.query;
  res.send(`用戶編號：${userId} 要修改類別 ${category} 的資料`);
});

/**
 * 取得所有用戶資料
 */
router.get('/all', async (req, res, next) => {
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    const userRepo = dataSource.getRepository('users');
    const users = await userRepo.find();
    res.json(users);
  } catch (err) {
    console.error('取得所有用戶資料時發生錯誤:', err);
    next(err);
  }
});

/**
 * 404 全域配對區域
 */
router.use((req, res) => {
  res.status(404).send('找不到這個用戶 > <');
});

/**
 * 錯誤處理器
 */
router.use((err, req, res, next) => {
  res.status(500).send(`發生異常：${err.message}`);
});

module.exports = router;
