const express = require("express")
const router = express.Router()
const employee = require("../data/employee")
router
    .route("/")
    .get((req, res)=> {
    res.json(employee)
})
    .post((req, res) =>{
        if (req.body.empId && req.body.name && req.body.designation){
            const emp = {
                id: employee[employee.length-1].id + 1,
                empId: req.body.empId,
                name: req.body.name,
                designation: req.body.designation
            }
            employee.push(emp)
            res.json(employee[employee.length - 1])
        }else res.json({error: "Insuffecient Data"})
    })
router
    .route("/:id")
    .get((req, res, next) => {
    const emp = employee.find((p) => p.id == req.params.id)
    if (emp) res.json(emp)
    else next()
})
    .patch((req, res, next)=>{
        const emp = employee.find((p, i) =>{
            if (p.id == req.params.id){
                for (const key in req.body){
                    employee[i][key] = req.body[key]
                }
                return true
            }
        })
        if (emp) res.json(emp)
        else next()
    })
    .delete((req, res, next) => {
        const emp = employee.find((p, i) =>{
            if (p.id == req.params.id){
                employee.splices(i, 1)
                return true
            }
        })
        if (emp) res.json(emp)
        else next()
    })
module.exports = router