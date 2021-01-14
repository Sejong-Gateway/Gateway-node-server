import express from "express";
import Subject from "../../models/Subject";

const router = express.Router();

router.post('/', async(req : any, res, next)=>{
    try{
        const subject = await new Subject(req.body).save();
        res.send({status:200, data:subject});
    }catch( error ){ 
        next(error);
    }
});

router.get('/', async(req,res, next) =>{
    if ( req.query.major ){
        console.log(req.query.major);
        try{
            const sujects = await Subject.find({major : req.query.major});
            res.send({status:200, data:sujects})
          }
          catch(error){
              next(error);
          }
    }
    else{
        try{ 
            const sujects = await Subject.find({});
            res.send({status:200, data:sujects})
        }
        catch(error){
            next(error);
        }
    }

});

router.get('/:id', async(req,res, next) =>{
    try{
        await Subject.findOne({hash: req.params.hash}, (err, subject) => {
            if (err) {
                return res.status(500).json({error: err});
            }
            if ( !subject ) {
                return res.status(404).json({error: 'subject not found!'});
            }
            res.send({success : true, data : subject});
        });
    }catch(error){
        next(error);
    }
});

router.delete('/:id', async(req, res, next) => {
    try{
        await Subject.findOneAndRemove({ _id: req.params.id });
        res.send({ success: true, data: "okay" });
    }catch(error){
        next(error);
    }
});

router.put('/:id', async(req, res, next) =>{
    try{
        const subejct = await Subject.findOneAndUpdate(
            { _id: req.params.id },
            { set : req.body},
            { new : true}
        );
        res.send({ success: true, data: subejct });
    }catch(error){
        next(error);
    }
})

export default router;
