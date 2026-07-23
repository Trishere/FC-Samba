//VIỄN CHINH//   
const expeditionMatches = [

    {
        date: "03/06/2026",
        opponent: "FC Lạ",
        homeScore: 0,
        awayScore: 4,
        knights: [
            "OnaThuan",
            "Đức Lee",
            "Ronaldat",
            "Anh Đạt",
            "Lil' Trí",
            "Hiếu Saka",
            "Quân Burger"
        ],

        
    },

    {
        date: "06/06/2026",
        opponent: "Hậu FC",
        homeScore: 1,
        awayScore: 0,
        knights: [
            "OnaThuan",
            "Đức Lee",
            "QHuy",
            "Lil' Trí",
            "Hiếu Saka",
            "Tài Suy (C)",
            "LuGiaHuy",
            "Nam Silun"
        ],
        

    },

    {
        date: "13/06/2026",
        opponent: "Phong Lâm FC",
        homeScore: 0,
        awayScore: 4,
        knights: [
            "OnaThuan",
            "LuGiaHuy",
            "Vũ Lông Thủ",
            "Tài Suy (C)",
            "Quân Burger",
            "Nam Silun",
            "Đức Lee",
            "Ronaldat",
            "Anh Đạt",
            "Hiếu Saka",
            "QHuy"
        ],
    
    },

    {
        date: "14/06/2026",
        opponent: "Hậu FC",
        homeScore: 0,
        awayScore: 2,
        knights: [
            "Anh Đạt (GK)",
            "Ronaldat",
            "Đức Lee",
            "QHuy",
            "Lil' Trí",
            "Hiếu Saka",
            "Nam Silun"
        ]
    },

    {
        date: "19/06/2026",
        opponent: "Quý FC",
        homeScore: 5,
        awayScore: 0,
        knights: [
            "Việt (GK)",
            "Ronaldat",
            "QHuy",
            "Tài Suy (C)",
            "Nam Silun",
            "Quân Burger",
            "Vũ Lông Thủ"
        ],
        
    },

    {
        date: "20/06/2026",
        opponent: "Phong Lâm FC",
        homeScore: 3,
        awayScore: 3,
        knights: [
            "LuGiaHuy",
            "Ronaldat",
            "Hiếu Saka",
            "QHuy",
            "Lil' Trí",
            "Nam Silun",
            "Đức Lee"
        ],
        
    },

    {
        date: "25/06/2026",
        opponent: "Hiếu's old CTy",
        homeScore: 1,
        awayScore: 0,
        knights: [
            "Đức Lee",
            "Ronaldat",
            "Hiếu Saka",
            "Tài Suy (C)"
        ],
       
    },

    {
        date: "27/06/2026",
        opponent: "Xuân Trường FC",
        homeScore: 0,
        awayScore: 1,
        knights: [
            "OnaThuan",
            "Tài Suy (C)",
            "Vũ Lông Thủ",
            "Hiếu Saka",
            "Ronaldat",
            "LuGiaHuy",
            "QHuy",
            "Lil' Trí",
            "Nam Silun",
            "Đức Lee"
        ],
        
    },

    {
        date: "02/07/2026",
        opponent: "Giặc Lạ FC",
        homeScore: 0,
        awayScore: 3,
        knights: [
            "Việt",
            "Quân Burger",
            "Xuân Trường",
            "Hiếu Saka",
            "Ronaldat",
            "QHuy",
            "Đức Lee"
        ],
    },

    {
        date: "25/07/2026",
        opponent: "XT F.C",
        homeScore: null,
        awayScore: null,
        knights: [
            "Quân Burger",
            "Xuân Trường",
            "Hiếu Saka",
            "Ronaldat",
            "QHuy",
            "Đức Lee"
        ],
    },

];

//NỘI CHIẾN//

const civilWarMatches = [
    {
        date: "24/05/2026",
        team: "Quốc Huy",
        teamRoster: ["Quốc Huy", "Đức Lee","Tài Suy","Vũ Lông Thủ","Phong Lâm", "Quân Burger" ], 
        opponent: "Ronaldat",
        opponentRoster: ["Ronaldat", "Anh Đạt", "Hiếu Saka", "Nam Silun", "Lil' Trí", "LuGiaHuy"], 
        homeScore: 10,
        awayScore: 0,
        knights: "7 • 6"
    },

    {
        date: "03/07/2026",
        team: "Quốc Huy",
        teamRoster: ["Quốc Huy", "Đức Lee","Tài Suy","Vũ Lông Thủ","Lil' Trí", "Quân Burger" ],
        opponent: "Ronaldat",
        opponentRoster: ["Ronaldat", "Team Quý"],
        homeScore: 1,
        awayScore: 0,
        knights: "6 • 6"
    },
    
    {
        date: "11/07/2026",
        team: "Râu Con",
        teamRoster: ["Quốc Huy","Tài Suy","Nam Silun", "Hiếu Saka", "LuGiaHuy", "Anh Đạt" ],
        opponent: "Ricon ",
        opponentRoster: ["Ronaldat", "Đức Lee", "Quân Burger", "Lil' Trí","OnaThuan", "Vũ Lông Thủ"],
        homeScore: 4,
        awayScore: 0,
        knights: "6 • 6",
        mvp: ["Quốc Huy"],
        goals: ["Nam Silun", "Tài Suy", "Quốc Huy","Đức Lee", 
               "Đức Lee", "LuGiaHuy", "Hiếu Saka", "Nam Silun", "Hiếu Saka", "Tài Suy", "Đức Lee", "Ronaldat"],
        assists: ["Anh Đạt", "Quân Burger", "Tài Suy", "Nam Silun", "LuGiaHuy", "Đức Lee"]
    },


    {
        date: "18/07/2026",
        team: "Râu Con",
        teamRoster: ["Quốc Huy","Tài Suy","Nam Silun", "Hiếu Saka", "LuGiaHuy", "Anh Đạt"],
        opponent: "Ricon ",
        opponentRoster: ["Ronaldat", "Đức Lee", "Quân Burger", "Lil' Trí","OnaThuan", "Vũ Lông Thủ"],
        homeScore: 4,
        awayScore: 4,
        knights: "6 • 6",
        mvp: ["Quân Burger"],
        goals: ["Ronaldat", "Anh Đạt", "Anh Đạt", "Quân Burger", "Quân Burger",
             "Tài Suy", "Hiếu Saka", "Vũ Lông Thủ"],
        assists: ["Nam Silun"]
    },
];