const fs = require('fs');
const path = require('path');

const TASKS_FILE = 'tasks.json';
const args = process.argv.slice(2);

// Hàm đọc dữ liệu từ file tasks.json
function readTasks() {
    const filePath = path.join(__dirname, TASKS_FILE);
    if (!fs.existsSync(filePath)) {
        return []; // Trả về mảng rỗng nếu file không tồn tại
    }
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return fileContent ? JSON.parse(fileContent) : [];
    } catch (error) {
        console.error('Lỗi khi đọc file:', error.message);
        return [];
    }
}

// Hàm ghi dữ liệu vào file tasks.json
function writeTasks(tasks) {
    const filePath = path.join(__dirname, TASKS_FILE);
    try {
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Lỗi khi ghi file:', error.message);
    }
}

function listTasks() {
    const tasks = readTasks();
    if (tasks.length === 0) {
        console.log('Không có tác vụ nào.');
        return;
    }

    const filterStatus = args[1] ? args[1] : 'all'; // Lấy đối số thứ hai để lọc

    const filteredTasks = tasks.filter(task => {
        if (filterStatus === 'all') {
            return true;
        }
        return task.status === filterStatus;
    });

    if (filteredTasks.length === 0) {
        console.log(`Không tìm thấy tác vụ nào với trạng thái "${filterStatus}".`);
        return;
    }

    console.log('\n--- Danh sách Tác vụ ---');
    filteredTasks.forEach(task => {
        console.log(`ID: ${task.id}`);
        console.log(`Mô tả: ${task.description}`);
        console.log(`Trạng thái: ${task.status}`);
        console.log(`Ngày tạo: ${new Date(task.createdAt).toLocaleString()}`);
        console.log(`Ngày cập nhật: ${new Date(task.updatedAt).toLocaleString()}`);
        console.log('-------------------------');
    });
}

// Hàm thêm tác vụ mới
function addTask(description) {
    const tasks = readTasks();
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const now = new Date().toISOString();

    const newTask = {
        id: newId,
        description: description,
        status: 'todo',
        createdAt: now,
        updatedAt: now
    };

    tasks.push(newTask);
    writeTasks(tasks);

    console.log(`Task added successfully (ID: ${newId})`);
}

// Hàm đọc dữ liệu từ file tasks.json

// Hàm ghi dữ liệu vào file tasks.json

// Hàm thêm tác vụ mới

function run() {
    if (args.length === 0) {
        console.log('Vui lòng nhập lệnh (ví dụ: add, list, ...)');
        return;
    }

    const command = args[0];

    // ... các dòng code khác
    switch (command) {
        case 'add': { // Thêm dấu ngoặc nhọn
            if (args.length < 2) {
                console.log('Cần mô tả tác vụ.');
                return;
            }
            const description = args.slice(1).join(' ');
            addTask(description);
            break;
        } // Đóng dấu ngoặc nhọn
        case 'list': { // Thêm dấu ngoặc nhọn
            listTasks();
            break;
        } // Đóng dấu ngoặc nhọn
        case 'update': { // Và các case còn lại
            // ... code
            break;
        }
        // ... các case khác
        default: {
            console.log(`Lệnh không hợp lệ: ${command}`);
        }
    }
    // ... các dòng code khác
}

// Gọi hàm chính
run();