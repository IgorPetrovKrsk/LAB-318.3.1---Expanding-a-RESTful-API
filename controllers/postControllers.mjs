
import posts from '../data/posts.mjs';

export function getAllPost(req, res) {
    const links = [
        {
            href: 'posts/:id',
            rel: ':id',
            type: 'GET',
        },
    ];
    res.json({ posts, links });
}

export function postPost(req, res) {
    if (req.body.userId && req.body.title && req.body.content) {
        const post = {
            id: posts[posts.length - 1].id + 1,
            userId: req.body.userId,
            title: req.body.title,
            content: req.body.content,
        };

        posts.push(post);
        res.json(posts[posts.length - 1]);
    } else next(error(400, 'Insufficient Data'));
}

export function getPostById(req, res, next) {
    const links = [
        {
            href: `/${req.params.id}`,
            rel: '',
            type: 'PATCH',
        },
        {
            href: `/${req.params.id}`,
            rel: '',
            type: 'DELETE',
        },
    ];

    const post = posts.find((p) => p.id == req.params.id);

    if (post) res.json({ post, links });
    else next();
}

export function patchPostById(req, res, next) {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing post in the database.

    const post = posts.find((p, i) => {
        if (p.id == req.params.id) {
            for (const key in req.body) {
                posts[i][key] = req.body[key];
            }
            return true;
        }
    });

    if (post) res.json(post);
    else next();
}

export function deletePostById(req, res, next) {
    // The DELETE request route simply removes a resource.
    const post = posts.find((p, i) => {
        if (p.id == req.params.id) {
            posts.splice(i, 1);
            return true;
        }
    });

    if (post) res.json(post);
    else next();
}

export function getUserPostsByUserId(req, res, next) {
    let allPosts = [];

    posts.forEach((p) => {
        if (p.userId == req.params.userId) {
            allPosts.push(p);
        }
    });

    if (allPosts.length > 0) res.json(allPosts);
    else next(error(400, 'No matching Posts'));
}