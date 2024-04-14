
function GenderCheck() {
  return (
    <div className="flex">
        <div className="form-control">
            <div className={`label gap-2 cursor-pointer`}>
              <span className="label-text">Male</span>
              <input type="checkbox" className="checkbox border-slate-900"/>
            </div>
        </div>
        <div className="form-control">
            <div className={`label gap-2 cursor-pointer`}>
              <span className="label-text">Female</span>
              <input type="checkbox" className="checkbox border-slate-900"/>
            </div>
        </div>
    </div>
  )
}

export default GenderCheck