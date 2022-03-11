
export const initialData = {
    boards:[
        {
            id: 'board-1',
            columnOder:['column-1', 'column-2', 'column-3'],
            columns:[
                {
                    id: 'column-1',
                    boardID:'board-1',
                    title:'To do column',
                    cardOder:['card-1', 'card-2', 'card-3', 'card-4', 'card-5','card-6','card-7',],
                    cards:[
                        {
                            id: 'card-1',
                            boardID:'board-1',
                            columnID:'column-1',
                            title:'Card 1 title',
                            cover: 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg'

                        },
                        {   id: 'card-2', boardID:'board-1', columnID:'column-1', title:'Card 2 title', cover: null},
                        {   id: 'card-3', boardID:'board-1', columnID:'column-1', title:'Card 3 title', cover: null},
                        {   id: 'card-4', boardID:'board-1', columnID:'column-1', title:'Card 4 title', cover: null},
                        {   id: 'card-5', boardID:'board-1', columnID:'column-1', title:'Card 5 title', cover: null},
                        {   id: 'card-6', boardID:'board-1', columnID:'column-1', title:'Card 6 title', cover: null},
                        {   id: 'card-7', boardID:'board-1', columnID:'column-1', title:'Card 7 title', cover: null},
                    ]
                },
                {
                    id: 'column-2',
                    boardID:'board-1',
                    title:'Inprogress column',
                    cardOder:['card-8', 'card-9', 'card-10',],
                    cards:[
                        {
                            id: 'card-1',
                            boardID:'board-1',
                            columnID:'column-1',
                            title:'Card 8 title',
                            cover: null

                        },
                        {   id: 'card-9', boardID:'board-1', columnID:'column-1', title:'Card 9 title', cover: null},
                        {   id: 'card-10', boardID:'board-1', columnID:'column-1', title:'Card 10 title', cover: null},
                    ]
                },
                {
                    id: 'column-3',
                    boardID:'board-1',
                    title:'Done column',
                    cardOder:['card-11', 'card-12', 'card-13',],
                    cards:[
                        {
                            id: 'card-11',
                            boardID:'board-1',
                            columnID:'column-1',
                            title:'Card 11 title',
                            cover: null

                        },
                        {   id: 'card-12', boardID:'board-1', columnID:'column-1', title:'Card 12 title', cover: null},
                        {   id: 'card-13', boardID:'board-1', columnID:'column-1', title:'Card 13 title', cover: null},
                    ]
                }
            ]
        }
    ]
}